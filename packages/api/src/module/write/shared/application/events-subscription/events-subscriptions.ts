import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PrismaService } from '@/prisma/prisma.service';
import { EVENT_REPOSITORY, EventRepository } from '@/write/shared/application/event-repository';
import {
  CanCreateSubscription,
  EventSubscriptionConfig,
  SubscriptionId,
} from '@/write/shared/application/events-subscription/events-subscription';
import {
  NeedsEventOrPositionHandlers,
  SubscriptionBuilder,
} from '@/write/shared/application/events-subscription/events-subscription-builder';

const defaultSubscriptionConfig: EventSubscriptionConfig = { from: { globalPosition: 0 }, rebuildOnChange: false };

@Injectable()
export class EventsSubscriptions implements CanCreateSubscription {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  subscription(id: SubscriptionId, config?: EventSubscriptionConfig): NeedsEventOrPositionHandlers {
    const configuration: EventSubscriptionConfig = {
      ...defaultSubscriptionConfig,
      ...config,
    };

    return new SubscriptionBuilder(this.prismaService, this.eventRepository, this.eventEmitter, id, configuration);
  }
}
