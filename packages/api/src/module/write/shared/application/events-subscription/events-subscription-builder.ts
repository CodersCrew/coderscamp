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
  SubscriptionOptions,
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
    private readonly options: SubscriptionOptions,
    private readonly positionHandlers: PositionHandler[] = [],
    private readonly eventHandlers: ApplicationEventHandler[] = [],
  ) {}

  onInitialPosition(handle: OnPositionFn): MoreEventHandlersOrBuild {
    const handlerToRegister: PositionHandler = {
      position: this.options.start.from.globalPosition,
      onPosition: handle,
    };

    return new SubscriptionBuilder(
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
      this.id,
      this.options,
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
      this.options,
      this.positionHandlers,
      [...this.eventHandlers, handlerToRegister],
    );
  }

  build(): EventsSubscription {
    return new EventsSubscription(
      this.id,
      {
        options: this.options,
        eventHandlers: this.eventHandlers,
        positionHandlers: this.positionHandlers,
      },
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
    );
  }
}
