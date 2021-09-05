import { PrismaClient } from '@prisma/client';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';
import { NeedsEventHandlers } from '@/write/shared/application/events-subscription/events-subscription-builder';

/**
 * Event types tylko do wyszukiwania na co sa subskrypcje
 * rebuildOnChange = useful especially for read models
 */
export type EventSubscriptionConfig = Partial<{ from: { globalPosition: number }; rebuildOnChange: boolean }>;
export type PrismaTransactionManager = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

// todo: hash of handlers and change code, event sub version change
/**
 * val subscrption = EventsSubscriptions
 * subscription('id', {from: {position?: 0, date?: '21-22-22'}})
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

export type OnEventFn<DomainEventType extends DomainEvent = DomainEvent> = (
  event: ApplicationEvent<DomainEventType>,
  context: { transaction: PrismaTransactionManager },
) => Promise<void> | void;

export type ApplicationEventHandler = {
  readonly eventType: string;
  readonly onEvent: OnEventFn;
};

export type SubscriptionId = string;

export interface CanCreateSubscription {
  subscription(id: SubscriptionId): NeedsEventHandlers;
}

// todo: zmiana listy eventow (typow) z pewnoscia oznacza reset i rebuild.
// wyliczanie checksum na podstawie handlerow, kodu i fromPosition. Jesli cos z tego sie zmieni, nastepuje reset pozycji do nowego configa start i rebuild.
export class EventsSubscription {
  constructor(
    private readonly subscriptionId: SubscriptionId,
    private readonly config: EventSubscriptionConfig,
    private readonly handlers: ApplicationEventHandler[] = [],
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
  ) {}

  // todo: add registerEventHandler methods? z tych zbiore razem nazwy (typy) i utworze suba. Jak to sie robi nie dla typu strumienia? Zobaczyc.
  // wyglada to w miare OK wtedy. Mowie od razu, ktore eventy subuje.
  async handleEvent<DomainEventType extends DomainEvent>(event: ApplicationEvent<DomainEventType>): Promise<void> {
    await this.prismaService.$transaction(async (transaction) => {
      const subscription = await transaction.eventsSubscription.findUnique({ where: { id: this.subscriptionId } });
      const currentPosition = subscription?.currentPosition ?? (this.config.from?.globalPosition ?? 1) - 1;

      if (event.globalOrder < currentPosition) {
        return;
      }

      await Promise.all(
        this.handlers
          .filter((handler) => handler.eventType === event.type)
          .map((handler) => handler.onEvent(event, { transaction })),
      );
      await this.onEventHandled(transaction, event);
    });
  }

  private async onEventHandled(transaction: PrismaTransactionManager, event: { globalOrder: number }) {
    await transaction.eventsSubscription.upsert({
      where: {
        id: this.subscriptionId,
      },
      create: {
        id: this.subscriptionId,
        eventTypes: this.handlingEventTypes(),
        fromPosition: 0,
        currentPosition: event.globalOrder,
      },
      update: {
        currentPosition: event.globalOrder,
      },
    });
  }

  private handlingEventTypes() {
    return this.handlers.map((h) => h.eventType);
  }
}
