import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';
import {
  ApplicationEventHandler,
  EventsSubscription,
  SubscriptionStart,
  OnEventFn,
  OnPositionFn,
  PositionHandler,
  SubscriptionId,
} from '@/write/shared/application/events-subscription/events-subscription';

export interface NeedsEventOrPositionHandlers {
  onInitialPosition(handle: OnPositionFn): MoreEventHandlersOrBuild;

  onEvent<DomainEventType extends DomainEvent>(
    eventType: DomainEventType['type'],
    handle: OnEventFn<DomainEventType>,
  ): MoreEventHandlersOrBuild;
}

export interface MoreEventHandlersOrBuild extends NeedsEventOrPositionHandlers {
  build(): EventsSubscription;
}

export class SubscriptionBuilder implements NeedsEventOrPositionHandlers, MoreEventHandlersOrBuild {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly id: SubscriptionId,
    private readonly configuration: SubscriptionStart,
    private readonly positionHandlers: PositionHandler[] = [],
    private readonly eventHandlers: ApplicationEventHandler[] = [],
  ) {}

  onInitialPosition(handle: OnPositionFn): MoreEventHandlersOrBuild {
    const handlerToRegister: PositionHandler = {
      position: this.configuration.from?.globalPosition ?? 1,
      onPosition: handle,
    };

    return new SubscriptionBuilder(
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
      this.id,
      this.configuration,
      [...this.positionHandlers, handlerToRegister],
      this.eventHandlers,
    );
  }

  onEvent<DomainEventType extends DomainEvent>(
    eventType: DomainEventType['type'],
    handle: OnEventFn<DomainEventType>,
  ): MoreEventHandlersOrBuild {
    const handlerToRegister: ApplicationEventHandler = {
      eventType,
      onEvent: handle as OnEventFn,
    };

    return new SubscriptionBuilder(
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
      this.id,
      this.configuration,
      this.positionHandlers,
      [...this.eventHandlers, handlerToRegister],
    );
  }

  build(): EventsSubscription {
    return new EventsSubscription(
      this.id,
      this.configuration,
      this.positionHandlers,
      this.eventHandlers,
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
    );
  }
}
