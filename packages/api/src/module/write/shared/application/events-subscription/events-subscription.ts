import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaClient } from '@prisma/client';
import { Mutex } from 'async-mutex';
import { retry } from 'ts-retry-promise';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';

export type EventsSubscriptionConfig = {
  readonly start: SubscriptionStart;
  readonly positionHandlers: PositionHandler[];
  readonly eventHandlers: ApplicationEventHandler[];
};
export type SubscriptionStart = { from: { globalPosition: number } };

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

  private readonly mutex = new Mutex();

  private readonly eventEmitterListener: (_: unknown, event: ApplicationEvent) => Promise<void> = async (
    _: unknown,
    event: ApplicationEvent,
  ) => {
    await this.handleEvent(event);
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
    const maxRetries = 3;

    await retry(
      async () => {
        await this.catchUp().catch((e) => {
          this.logger.warn(`EventsSubscription ${this.subscriptionId} processing error in CatchUp phase.`, e);
          throw e;
        });
        await this.listen().catch((e) => {
          this.logger.warn(`EventsSubscription ${this.subscriptionId} processing error in listen phase.`, e);
          throw e;
        });
      },
      { retries: maxRetries, delay: 5000, backoff: 'EXPONENTIAL' },
    ).catch((e) =>
      this.logger.error(
        `EventsSubscription ${this.subscriptionId} stopped processing of events after ${maxRetries} retries.`,
        e,
      ),
    );
  }

  /**
   * Stops listening for new events.
   * Cancel processing of currently handling event.
   */
  async stop(): Promise<void> {
    this.eventEmitter.offAny(this.eventEmitterListener);
    this.mutex.cancel();
  }

  /**
   * Stops processing.
   * Reset currentPosition to initialPosition.
   * Start processing from initialPosition.
   */
  async reset(): Promise<void> {
    await this.stop();
    await this.prismaService.$transaction(async (transaction) => {
      await this.moveCurrentPosition(this.configuration.start.from.globalPosition - 1, transaction);
    });
    await this.start();
  }

  private async listen(): Promise<void> {
    this.eventEmitter.onAny(this.eventEmitterListener);
  }

  private async catchUp(): Promise<void> {
    const subscriptionState = await this.prismaService.eventsSubscription.findUnique({
      where: { id: this.subscriptionId },
    });
    const eventsToCatchup = await this.eventRepository.readAll({
      fromGlobalPosition: subscriptionState?.currentPosition
        ? subscriptionState.currentPosition + 1
        : this.configuration.start.from.globalPosition,
    });

    await Promise.all(eventsToCatchup.map((e) => this.handleEvent(e)));
  }

  /**
   * Handle event sequentially one after another by mean of mutex pattern.
   * Handling an event is an atomic operation. While handling:
   *  - Run position handlers for handling event.globalOrder. Initial position handler is usable for preparing initial state of read model while resetting subscription associated with the read model.
   *  - Run event handlers for handling event.type.
   *  - Move subscription current position to event.globalOrder.
   *
   *  @throws Error if projection missed some event (for example: currentPosition is 5, but received event with globalOrder 7 instead of 6).
   */
  private async handleEvent<DomainEventType extends DomainEvent>(
    event: ApplicationEvent<DomainEventType>,
  ): Promise<void> {
    await this.mutex
      .runExclusive(async () => {
        await this.prismaService.$transaction(async (transaction) => {
          const subscriptionState = await transaction.eventsSubscription.findUnique({
            where: { id: this.subscriptionId },
          });
          const currentPosition =
            subscriptionState?.currentPosition ?? this.configuration.start.from.globalPosition - 1;

          const expectedEventPosition = currentPosition + 1;

          this.throwIfSomeEventsWasMissed(event, expectedEventPosition);

          await this.processSubscriptionPositionChange(event, transaction);
          await this.processEvent(event, transaction);
          await this.moveCurrentPosition(event.globalOrder, transaction);
        });
      })
      .catch(async (e) => {
        await this.stop();
        this.logger.warn(
          `EventsSubscription ${this.subscriptionId} processing stopped on position ${event.globalOrder}`,
          e,
        );
        throw e;
      });
  }

  private throwIfSomeEventsWasMissed(event: ApplicationEvent, expectedEventPosition: number) {
    if (event.globalOrder !== expectedEventPosition) {
      throw new Error(
        `EventsSubscription ${this.subscriptionId} missed some events! Expected position: ${expectedEventPosition}, but current event position is: ${event.globalOrder}`,
      );
    }
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

  private async moveCurrentPosition(position: number, transaction: PrismaTransactionManager) {
    await transaction.eventsSubscription.upsert({
      where: {
        id: this.subscriptionId,
      },
      create: {
        id: this.subscriptionId,
        eventTypes: this.handlingEventTypes(),
        fromPosition: this.configuration.start.from.globalPosition,
        currentPosition: position,
      },
      update: {
        currentPosition: position,
        eventTypes: this.handlingEventTypes(),
      },
    });
  }

  private handlingEventTypes() {
    return this.configuration.eventHandlers.map((h) => h.eventType);
  }
}
