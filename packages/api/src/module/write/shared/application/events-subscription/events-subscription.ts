import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaClient } from '@prisma/client';
import { Mutex } from 'async-mutex';
import { retry } from 'ts-retry-promise';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';

export type SubscriptionStart = Partial<{ from: { globalPosition: number } }>;
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
 * Published events have property order
 * You can register
 */
export class EventsSubscription {
  private readonly logger = new Logger(EventsSubscription.name);

  constructor(
    readonly subscriptionId: SubscriptionId,
    private readonly startConfig: SubscriptionStart,
    private readonly positionHandlers: PositionHandler[] = [],
    private readonly eventHandlers: ApplicationEventHandler[] = [],
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly mutex = new Mutex(),
    private readonly eventListener: (_: unknown, event: ApplicationEvent) => Promise<void> = async (
      _: unknown,
      event: ApplicationEvent,
    ) => {
      await this.handleEvent(event);
    },
  ) {}

  /**
   * Run subscription in two steps:
   *    1.  CatchUp - it's a processing during subscription processing all events which have occurred in the past (before start() invocation).
   *        Assuming that currentPosition of subscription is 10, and last event globalOrder is 15, then subscription will process events 11,12,13,14 and 15.
   *    2.  Listen - after catchup phase, the subscription will start listening for new events (with global order greater than 15).
   */
  async start(): Promise<void> {
    const maxRetries = 0;

    await retry(
      async () => {
        await this.catchUp();
        await this.listen();
      },
      { retries: maxRetries },
    ).catch((e) =>
      this.logger.error(
        `EventSubscription ${this.subscriptionId} stopped processing of events after ${maxRetries} retries.`,
        e,
      ),
    );
  }

  /**
   * Stops listening for new events.
   * Cancel processing of currently handling event.
   */
  async stop(): Promise<void> {
    this.eventEmitter.offAny(this.eventListener);
    this.mutex.cancel();
  }

  private async listen(): Promise<void> {
    this.eventEmitter.onAny(this.eventListener);
  }

  private async catchUp(): Promise<void> {
    const subscriptionState = await this.prismaService.eventsSubscription.findUnique({
      where: { id: this.subscriptionId },
    });
    const eventsToCatchup = await this.eventRepository.readAll({
      fromGlobalPosition: subscriptionState?.currentPosition
        ? subscriptionState.currentPosition + 1
        : this.startConfig.from?.globalPosition ?? 1,
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
            subscriptionState?.currentPosition ?? (this.startConfig.from?.globalPosition ?? 1) - 1;

          const expectedEventPosition = currentPosition + 1;

          this.throwIfSomeEventsWasMissed(event, expectedEventPosition);

          await this.processSubscriptionPositionChange(event, transaction);
          await this.processEvent(event, transaction);
          await this.onEventProcessed(event, transaction);
        });
      })
      .catch(async (e) => {
        await this.stop();
        this.logger.warn(
          `EventSubscription ${this.subscriptionId} processing stopped on position ${event.globalOrder}`,
          e,
        );
        throw e;
      });
  }

  private throwIfSomeEventsWasMissed(event: ApplicationEvent, expectedEventPosition: number) {
    if (event.globalOrder !== expectedEventPosition) {
      throw new Error(
        `EventSubscription ${this.subscriptionId} missed some events! Expected position: ${expectedEventPosition}, but current event position is: ${event.globalOrder}`,
      );
    }
  }

  private async processEvent(event: ApplicationEvent, transaction: PrismaTransactionManager) {
    await Promise.all(
      this.eventHandlers
        .filter((handler) => handler.eventType === event.type)
        .map((handler) => handler.onEvent(event, { transaction })),
    );
  }

  private async processSubscriptionPositionChange(event: ApplicationEvent, transaction: PrismaTransactionManager) {
    await Promise.all(
      this.positionHandlers
        .filter((handler) => handler.position === event.globalOrder)
        .map((handler) => handler.onPosition(event.globalOrder, { transaction })),
    );
  }

  private async onEventProcessed(event: ApplicationEvent, transaction: PrismaTransactionManager) {
    await transaction.eventsSubscription.upsert({
      where: {
        id: this.subscriptionId,
      },
      create: {
        id: this.subscriptionId,
        eventTypes: this.handlingEventTypes(),
        fromPosition: this.startConfig.from?.globalPosition ?? 1,
        currentPosition: event.globalOrder,
      },
      update: {
        currentPosition: event.globalOrder,
        eventTypes: this.handlingEventTypes(),
      },
    });
  }

  private handlingEventTypes() {
    return this.eventHandlers.map((h) => h.eventType);
  }
}
