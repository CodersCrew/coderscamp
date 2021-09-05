import { PrismaClient } from '@prisma/client';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';

/**
 * Event types tylko do wyszukiwania na co sa subskrypcje
 * rebuildOnChange = useful especially for read models
 */
export type EventSubscriptionConfig = Partial<{ from: { globalPosition: number }; rebuildOnChange: boolean }>;
const defaultSubscriptionConfig: EventSubscriptionConfig = { from: { globalPosition: 0 }, rebuildOnChange: false };
export type PrismaTransactionManager = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

// todo: hash of handlers and change code, event sub version change
/**
 * val subscrption = EventsSubscriptions
 * subscription('id', {from: {position?: 0, date?: '21-22-22'}})
 * .onEvent<DomainEvent>(type, handler (appEvent) => Promise<void>)
 * .onEvent<DomainEvent>(type, handler
 * .subscribe();
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
) => Promise<void>;

type ApplicationEventHandler = {
  readonly eventType: string;
  readonly onEvent: OnEventFn;
};

export type SubscriptionId = string;

interface CanCreateSubscription {
  subscription(id: SubscriptionId): NeedsEventHandlers;
}

interface NeedsEventHandlers {
  onEvent<DomainEventType extends DomainEvent>(
    eventType: DomainEventType['type'],
    handle: OnEventFn<DomainEventType>,
  ): MoreEventHandlersOrSubscribe;
}

interface MoreEventHandlersOrSubscribe extends NeedsEventHandlers {
  subscribe(): Promise<SubscriptionId>; // todo: !
}

// todo: one builder class!? przy zmianie rebuildzie tworzy sie nowa wersja, stara jest nie aktywna.
class SubscriptionBuilder implements NeedsEventHandlers, MoreEventHandlersOrSubscribe {
  constructor(
    private readonly id: SubscriptionId,
    private readonly configuration: EventSubscriptionConfig,
    private readonly handlers: ApplicationEventHandler[] = [],
  ) {}

  onEvent<DomainEventType extends DomainEvent>(
    eventType: DomainEventType['type'],
    handle: OnEventFn<DomainEventType>,
  ): MoreEventHandlersOrSubscribe {
    const handlerToRegister: ApplicationEventHandler = {
      eventType,
      onEvent: handle as OnEventFn,
    };

    return new SubscriptionBuilder(this.id, this.configuration, [...this.handlers, handlerToRegister]);
  }

  subscribe(): Promise<SubscriptionId> {
    return Promise.resolve(undefined);
  }
}

export class EventsSubscriptions implements CanCreateSubscription {
  constructor(private readonly prismaService: PrismaService, private readonly eventRepository: EventRepository) {}

  subscription(id: SubscriptionId, config?: EventSubscriptionConfig): NeedsEventHandlers {
    const configuration: EventSubscriptionConfig = {
      ...defaultSubscriptionConfig,
      ...config,
    };

    return new SubscriptionBuilder(id, configuration);
  }
}

// todo: zmiana listy eventow (typow) z pewnoscia oznacza reset i rebuild.
// wyliczanie checksum na podstawie handlerow, kodu i fromPosition. Jesli cos z tego sie zmieni, nastepuje reset pozycji do nowego configa start i rebuild.
class EventsSubscription {
  constructor(
    private readonly config: EventSubscriptionConfig,
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
    private readonly handlers: ApplicationEventHandler[] = [],
  ) {}

  // todo: add registerEventHandler methods? z tych zbiore razem nazwy (typy) i utworze suba. Jak to sie robi nie dla typu strumienia? Zobaczyc.
  // wyglada to w miare OK wtedy. Mowie od razu, ktore eventy subuje.
  async handleEvent<DomainEventType extends DomainEvent>(
    event: ApplicationEvent<DomainEventType>,
    handlerFn: OnEventFn<DomainEventType>,
  ): Promise<void> {
    const subscriptionId = this.config.id;

    await this.prismaService.$transaction(async (transaction) => {
      const subscription = await transaction.eventsSubscription.findUnique({ where: { id: subscriptionId } });
      const currentPosition = subscription?.currentPosition ?? this.config.fromPosition - 1;

      if (event.globalOrder < currentPosition) {
        return;
      }

      await handlerFn(event, { transaction });
      await transaction.eventsSubscription.upsert({
        where: {
          id: subscriptionId,
        },
        create: {
          id: subscriptionId,
          eventTypes: this.config.eventTypes,
          fromPosition: 0,
          currentPosition: event.globalOrder,
        },
        update: {
          currentPosition: event.globalOrder,
        },
      });
    });
  }
}
