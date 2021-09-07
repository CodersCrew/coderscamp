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

  // fixme: use retry somehow
  async start(): Promise<void> {
    await retry(
      async () => {
        await this.catchUp();
        await this.subscribe();
      },
      { retries: 2 },
    );
  }

  async stop(): Promise<void> {
    this.mutex.cancel();
    this.eventEmitter.offAny(this.eventListener);
  }

  private async subscribe(): Promise<void> {
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
   *  - Run position handlers for handling event.globalOrder.
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
        await this.prismaService
          .$transaction(async (transaction) => {
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
          })
          .catch(() => this.stop());
      })
      .catch(
        (e) =>
          this.logger.warn(
            `EventSubscription ${this.subscriptionId} processing stopped on position ${event.globalOrder}`,
            e,
          ), // todo: retry, longer setting. No retries because of the catch
      );
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
