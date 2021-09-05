import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaClient } from '@prisma/client';
import { Mutex } from 'async-mutex';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';
import { NeedsEventOrPositionHandlers } from '@/write/shared/application/events-subscription/events-subscription-builder';

/**
 * Event types tylko do wyszukiwania na co sa subskrypcje
 * rebuildOnChange = useful especially for read models
 */
export type EventSubscriptionConfig = Partial<{ from: { globalPosition: number }; rebuildOnChange: boolean }>;
export type PrismaTransactionManager = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;
// how to unsubscribe!?
// todo: hash of handlers and change code, event sub version change
/**
 * val subscrption = EventsSubscriptions
 * subscription('id', {from: {position?: 0, date?: '21-22-22'}})
 * .fromPosition() // .fromBeginning() // .fromDate()
 * .reprocessOnChanges() // better to change id for version - np.
 * .onEvent<DomainEvent>(type, handler (appEvent) => Promise<void>)
 * .onEvent<DomainEvent>(type, handler
 * .build();
 *
 * //healthy app only ready is sub up-to-date?
 * //catchup mechanism?
 * subscription.handleEvent()
 * subscription.rebuild()
 * subscription.close()
 */
// healthcheck endpoint!?
// https://www.typescriptlang.org/play?#code/CYUwxgNghgTiAEkoGdnwKIDcQDsAu6AtgJZ54gzwDeAUPPCCXgBQjb4Bc8UOAngJRdMAe2LAaAXxo0kqeAEEweYTAA8AFQB81OvAAOMYpijl4AfUJRiEAEbCAHl3UBtALrwAvPDe6DRkwhmBsJgIKjEOADmnvAAZlAQyCC+hsamZoyk5JReOCAA7hjsBEzZzPy6ukk4wKzFTvw69PR4ABbEyAB0Fla2Dp16AK7IrXW4eBW69MSx8MxtHd3BoeFRjbTNzXB4gzA4U-BSBwtdQTAhYcgR0V54MIPJBxAgeAyYTvAAPvCDNSCxERA4k2xxgvCam3g+XazzmbBiJ26lmsdnsnRGMxY-EaEMh8ERGVKFE6mRYbAqeKkmwkcQiCQg4I2kIJy0u1xi8USyWp8F0UgkQA
// task queue (promise - event) - https://www.codementor.io/@edafeadjekeemunotor/building-a-concurrent-promise-queue-with-javascript-1ano2eof0v

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

export interface CanCreateSubscription {
  subscription(id: SubscriptionId): NeedsEventOrPositionHandlers;
}

// todo: zmiana listy eventow (typow) z pewnoscia oznacza reset i rebuild.
// wyliczanie checksum na podstawie handlerow, kodu i fromPosition. Jesli cos z tego sie zmieni, nastepuje reset pozycji do nowego configa subscribe i rebuild.
// catchup
// subscribe
// introduce readmodel rebuild
// reset position
export class EventsSubscription {
  constructor(
    private readonly subscriptionId: SubscriptionId,
    private readonly config: EventSubscriptionConfig,
    private readonly positionHandlers: PositionHandler[] = [],
    private readonly eventHandlers: ApplicationEventHandler[] = [],
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly mutex = new Mutex(),
  ) {}

  subscribe(): EventsSubscription {
    // todo: priority queue
    this.eventEmitter.onAny(async (_, event) => {
      await this.handleEvent(event);
    });

    return this;
  }

  async catchUp() {
    const subscriptionState = await this.prismaService.eventsSubscription.findUnique({
      where: { id: this.subscriptionId },
    });
    const eventsToCatchup = await this.eventRepository.readAll({
      eventTypes: this.handlingEventTypes(),
      fromGlobalPosition: subscriptionState?.currentPosition ?? this.config.from?.globalPosition ?? 0,
    });

    await Promise.all(eventsToCatchup.map((e) => this.handleEvent(e)));

    return this;
  }

  private async handleEvent<DomainEventType extends DomainEvent>(
    event: ApplicationEvent<DomainEventType>,
  ): Promise<void> {
    await this.mutex.runExclusive(async () => {
      await this.prismaService.$transaction(async (transaction) => {
        const subscriptionState = await transaction.eventsSubscription.findUnique({
          where: { id: this.subscriptionId },
        });
        const currentPosition = subscriptionState?.currentPosition ?? (this.config.from?.globalPosition ?? 1) - 1;

        if (event.globalOrder < currentPosition) {
          return;
        }

        await Promise.all(
          this.positionHandlers
            .filter((handler) => handler.position === event.globalOrder)
            .map((handler) => handler.onPosition(event.globalOrder, { transaction })),
        );

        await Promise.all(
          this.eventHandlers
            .filter((handler) => handler.eventType === event.type)
            .map((handler) => handler.onEvent(event, { transaction })),
        );

        await transaction.eventsSubscription.upsert({
          where: {
            id: this.subscriptionId,
          },
          create: {
            id: this.subscriptionId,
            eventTypes: this.handlingEventTypes(),
            fromPosition: this.config.from?.globalPosition ?? 0,
            currentPosition: event.globalOrder,
            checksum: 'test',
          },
          update: {
            currentPosition: event.globalOrder,
          },
        });
      });
    });
  }

  private handlingEventTypes() {
    return this.eventHandlers.map((h) => h.eventType);
  }
}
