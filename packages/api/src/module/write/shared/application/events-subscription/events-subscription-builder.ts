import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';
import {
  ApplicationEventHandler,
  EventsSubscription,
  EventSubscriptionConfig,
  OnEventFn,
  SubscriptionId,
} from '@/write/shared/application/events-subscription/events-subscription';

export interface NeedsEventHandlers {
  onEvent<DomainEventType extends DomainEvent>(
    eventType: DomainEventType['type'],
    handle: OnEventFn<DomainEventType>,
  ): MoreEventHandlersOrBuild;
}

export interface MoreEventHandlersOrBuild extends NeedsEventHandlers {
  build(): EventsSubscription;
}

export class SubscriptionBuilder implements NeedsEventHandlers, MoreEventHandlersOrBuild {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
    private readonly id: SubscriptionId,
    private readonly configuration: EventSubscriptionConfig,
    private readonly handlers: ApplicationEventHandler[] = [],
  ) {}

  onEvent<DomainEventType extends DomainEvent>(
    eventType: DomainEventType['type'],
    handle: OnEventFn<DomainEventType>,
  ): MoreEventHandlersOrBuild {
    const handlerToRegister: ApplicationEventHandler = {
      eventType,
      onEvent: handle as OnEventFn,
    };

    return new SubscriptionBuilder(this.prismaService, this.eventRepository, this.id, this.configuration, [
      ...this.handlers,
      handlerToRegister,
    ]);
  }

  build(): EventsSubscription {
    return new EventsSubscription(this.id, this.configuration, this.handlers, this.prismaService, this.eventRepository);
  }
}
