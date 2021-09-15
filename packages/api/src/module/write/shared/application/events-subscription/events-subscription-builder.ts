import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';
import {
  ApplicationEventHandler,
  EventsSubscription,
  OnEventFn,
  OnPositionFn,
  PositionHandler,
  SubscriptionId,
  SubscriptionRetriesConfig,
  SubscriptionStart,
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
    private readonly start: SubscriptionStart,
    private readonly positionHandlers: PositionHandler[] = [],
    private readonly eventHandlers: ApplicationEventHandler[] = [],
    private readonly retry?: SubscriptionRetriesConfig,
  ) {}

  onInitialPosition(handle: OnPositionFn): MoreEventHandlersOrBuild {
    const handlerToRegister: PositionHandler = {
      position: this.start.from.globalPosition,
      onPosition: handle,
    };

    return new SubscriptionBuilder(
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
      this.id,
      this.start,
      [...this.positionHandlers, handlerToRegister],
      this.eventHandlers,
      this.retry,
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
      this.start,
      this.positionHandlers,
      [...this.eventHandlers, handlerToRegister],
      this.retry,
    );
  }

  build(): EventsSubscription {
    return new EventsSubscription(
      this.id,
      {
        start: this.start,
        eventHandlers: this.eventHandlers,
        positionHandlers: this.positionHandlers,
        retry: this.retry,
      },
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
    );
  }
}
