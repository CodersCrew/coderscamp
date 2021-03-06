/* eslint-disable no-await-in-loop */
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaClient } from '@prisma/client';
import { wait } from 'ts-retry-promise';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { NotificationToken } from '@/shared/utils/notification-token';
import { retryUntil } from '@/shared/utils/retry-until';
import { EventRepository } from '@/write/shared/application/event-repository';

import { EventsSubscriptionPositionPointer } from './events-subscription-position-pointer';
import { OrderedEventQueue } from './ordered-event-queue';

export type EventsSubscriptionConfig = {
  readonly options: SubscriptionOptions;
  readonly positionHandlers: PositionHandler[];
  readonly eventHandlers: ApplicationEventHandler[];
};

type SubscriptionRetriesConfig = {
  delay: number;
  backoff: 'FIXED' | 'EXPONENTIAL' | 'LINEAR';
  maxBackoff: number;
  resetBackoffAfter: number;
  until?: (e: Error | void) => boolean;
};
type SubscriptionStartConfig = { from: { globalPosition: number } };
type SubscriptionQueueConfig = { maxRetryCount: number; waitingTimeOnRetry: number };

export type SubscriptionOptions = {
  readonly start: SubscriptionStartConfig;
  readonly queue: SubscriptionQueueConfig;
  readonly retry: SubscriptionRetriesConfig;
};

export type PrismaTransactionManager = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

export type OnEventFn<DomainEventType extends DomainEvent = DomainEvent> = (
  event: ApplicationEvent<DomainEventType>,
  context: { transaction: PrismaTransactionManager },
) => Promise<void> | void;

export type ApplicationEventHandler = {
  readonly eventType: string;
  readonly onEvent: OnEventFn;
};

export type OnPositionFn = (
  position: number,
  context: { transaction: PrismaTransactionManager },
) => Promise<void> | void;

export type PositionHandler = {
  readonly position: number;
  readonly onPosition: OnPositionFn;
};

export type SubscriptionId = string;

/**
 * EventsSubscription will receive all events published from EventRepository.
 * Published events have property globalOrder generated by auto-increment db field.
 * You can register handlers to be run or certain event.type or event.globalOrder.
 * Implementation is currently coupled with Prisma (support transactional - atomic event processing and moving subscription position) as database client and EventEmitter2 as event bus.
 * Subscription position is a globalOrder of last successfully processed event.
 */
export class EventsSubscription {
  private readonly logger = new Logger(EventsSubscription.name);

  private readonly eventsRetryCount = new Map<string, number>();

  private readonly queue = new OrderedEventQueue();

  private shutdownToken = new NotificationToken();

  private running = false;

  private readonly eventEmitterListener: (_: unknown, event: ApplicationEvent) => void = (
    _: unknown,
    event: ApplicationEvent,
  ) => {
    return this.queue.push(event);
  };

  constructor(
    readonly subscriptionId: SubscriptionId,
    private readonly configuration: EventsSubscriptionConfig,
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Run subscription in two steps:
   *    1.  CatchUp - it's a processing during subscription processing all events which have occurred in the past (before start() invocation).
   *        Assuming that currentPosition of subscription is 10, and last event globalOrder is 15, then subscription will process events 11,12,13,14 and 15.
   *    2.  Listen - after catchup phase, the subscription will start listening for new events (with global order greater than 15).
   * After event handled event, subscription currentPosition is increased. There is strong transactional consistency for event handling and moving subscription position.
   * See handleEvent for more details how handling event working.
   */
  async start(): Promise<void> {
    if (this.running) {
      this.logger.warn(`${this.subscriptionId} is running`);

      return;
    }

    this.logger.debug(`${this.subscriptionId} started`);
    this.queue.clear();
    this.eventEmitter.onAny(this.eventEmitterListener);
    this.shutdownToken.reset();
    this.running = true;
    this.run();
  }

  /**
   * Stops listening for new events.
   */
  async stop(): Promise<void> {
    if (!this.running) {
      this.logger.warn(`${this.subscriptionId} finished`);

      return;
    }

    this.logger.debug(`${this.subscriptionId} shutdown has been requested`);
    this.eventEmitter.offAny(this.eventEmitterListener);
    this.queue.stop();
    this.running = false;
    await this.shutdownToken.wait(60 * 1000).catch((e: Error) => this.logger.warn(e, e?.stack));
    this.logger.debug(`${this.subscriptionId} finished`);
  }

  private async listen(): Promise<void> {
    const position = await this.getPositionPointer();
    let event = await this.queue.pop();

    while (!OrderedEventQueue.isStopToken(event)) {
      this.logger.debug(`${this.subscriptionId} received event(${event.id},${event.globalOrder})`);

      if (position.eventWasProcessed(event)) {
        this.logger.warn(`${this.subscriptionId} received old event(${event.id}, ${event.globalOrder})`);
      } else if (position.globalOrderIsPreserved(event)) {
        await this.handleEvent(event);
        await position.increment();
      } else {
        await this.retryWithWaitingForCorrectOrder(event);
      }

      event = await this.queue.pop();
    }
  }

  private async catchUp(): Promise<void> {
    const subscriptionState = await this.prismaService.eventsSubscription.findUnique({
      where: { id: this.subscriptionId },
    });

    this.eventsRetryCount.clear();
    this.queue.clear();

    const eventsToCatchup = await this.eventRepository.readAll({
      fromGlobalPosition: subscriptionState?.currentPosition
        ? subscriptionState.currentPosition + 1
        : this.configuration.options.start.from.globalPosition,
    });

    eventsToCatchup.forEach((event) => this.queue.push(event));
  }

  /**
   * Handle event sequentially one after another by mean of queue pattern.
   * Handling an event is an atomic operation. While handling:
   *  - Run position handlers for handling event.globalOrder. Initial position handler is usable for preparing initial state of read model while resetting subscription associated with the read model.
   *  - Run event handlers for handling event.type.
   *
   *  @throws Error if projection missed some event (for example: currentPosition is 5, but received event with globalOrder 7 instead of 6).
   */
  private async handleEvent<DomainEventType extends DomainEvent>(
    event: ApplicationEvent<DomainEventType>,
  ): Promise<void> {
    this.eventsRetryCount.delete(event.id);

    try {
      await this.processSubscriptionPositionChange(event, this.prismaService);
      await this.processEvent(event, this.prismaService);
    } catch (e) {
      this.logger.warn(
        `EventsSubscription ${this.subscriptionId} processing stopped on position ${event.globalOrder}`,
        e,
      );
      throw e;
    }
  }

  async retryWithWaitingForCorrectOrder(event: ApplicationEvent): Promise<void> {
    const count = this.eventsRetryCount.get(event.id) ?? 0;

    if (count >= this.configuration.options.queue.maxRetryCount) {
      throw new Error(
        `EventsSubscription ${this.subscriptionId} missed some events! MaxRetryCount reached on event(${event.id}) with globalOrder(${event.globalOrder})`,
      );
    }

    this.queue.push(event);
    this.eventsRetryCount.set(event.id, count + 1);
    // TODO cancel wait when subscriber recive stop signal
    await wait(this.configuration.options.queue.waitingTimeOnRetry);
  }

  private async processEvent(event: ApplicationEvent, transaction: PrismaTransactionManager) {
    await Promise.all(
      this.configuration.eventHandlers
        .filter((handler) => handler.eventType === event.type)
        .map((handler) => handler.onEvent(event, { transaction })),
    );
  }

  private async processSubscriptionPositionChange(event: ApplicationEvent, transaction: PrismaTransactionManager) {
    await Promise.all(
      this.configuration.positionHandlers
        .filter((handler) => handler.position === event.globalOrder)
        .map((handler) => handler.onPosition(event.globalOrder, { transaction })),
    );
  }

  private handlingEventTypes() {
    return this.configuration.eventHandlers.map((h) => h.eventType);
  }

  private getPositionPointer(): Promise<EventsSubscriptionPositionPointer> {
    return EventsSubscriptionPositionPointer.initialize(this.prismaService, {
      subscriptionId: this.subscriptionId,
      handlingEventTypes: this.handlingEventTypes(),
      startFromGlobalPosition: this.configuration.options.start.from.globalPosition,
    });
  }

  private async run() {
    try {
      await retryUntil(
        async () => {
          this.logger.debug(`${this.subscriptionId} is starting CatchUp phase.`);
          await this.catchUp().catch((e) => {
            this.logger.warn(`${this.subscriptionId} processing error in CatchUp phase.`);
            throw e;
          });
          this.logger.debug(`${this.subscriptionId} finished CatchUp phase.`);

          this.logger.debug(`${this.subscriptionId} is listening.`);
          await this.listen().catch(async (e) => {
            this.logger.warn(`${this.subscriptionId} processing error in listen phase.`);
            throw e;
          });
          this.logger.debug(`${this.subscriptionId} finished listen phase.`);
        },
        {
          ...this.configuration.options.retry,
          until: this.configuration.options.retry.until ?? (() => this.running),
          logger: (msg) => this.logger.warn(`${this.subscriptionId} ${msg}`),
        },
      );
    } catch (e) {
      this.logger.error(
        `${this.subscriptionId} stopped processing events with unexpected error`,
        (e as Error)?.stack,
        e,
      );
    } finally {
      this.shutdownToken.notify();
    }
  }
}
