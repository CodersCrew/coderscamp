import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PrismaService } from '@/prisma/prisma.service';
import { EVENT_REPOSITORY, EventRepository } from '@/write/shared/application/event-repository';
import {
  SubscriptionStart,
  SubscriptionId,
} from '@/write/shared/application/events-subscription/events-subscription';
import {
  NeedsEventOrPositionHandlers,
  SubscriptionBuilder,
} from '@/write/shared/application/events-subscription/events-subscription-builder';

export interface CanCreateSubscription {
  subscription(id: SubscriptionId): NeedsEventOrPositionHandlers;
}

@Injectable()
export class EventsSubscriptionsRegistry implements CanCreateSubscription {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  subscription(id: SubscriptionId, start?: SubscriptionStart): NeedsEventOrPositionHandlers {
    const defaultSubscriptionConfig: SubscriptionStart = { from: { globalPosition: 1 } };
    const startConfig: SubscriptionStart = {
      ...defaultSubscriptionConfig,
      ...start,
    };

    return new SubscriptionBuilder(this.prismaService, this.eventRepository, this.eventEmitter, id, startConfig);
  }
}
