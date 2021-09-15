import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PrismaService } from '@/prisma/prisma.service';
import { EVENT_REPOSITORY, EventRepository } from '@/write/shared/application/event-repository';
import {
  SubscriptionId,
  SubscriptionRetriesConfig,
  SubscriptionStart,
} from '@/write/shared/application/events-subscription/events-subscription';
import {
  NeedsEventOrPositionHandlers,
  SubscriptionBuilder,
} from '@/write/shared/application/events-subscription/events-subscription-builder';

export interface CanCreateSubscription {
  subscription(
    id: SubscriptionId,
    config?: { start?: Partial<SubscriptionStart>; retry?: SubscriptionRetriesConfig },
  ): NeedsEventOrPositionHandlers;
}

@Injectable()
export class EventsSubscriptionsRegistry implements CanCreateSubscription {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  subscription(
    id: SubscriptionId,
    config?: { start?: Partial<SubscriptionStart>; retry?: SubscriptionRetriesConfig },
  ): NeedsEventOrPositionHandlers {
    const defaultSubscriptionConfig: SubscriptionStart = { from: { globalPosition: 1 } };
    const startConfig: SubscriptionStart = {
      ...defaultSubscriptionConfig,
      ...config?.start,
    };

    return new SubscriptionBuilder(
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
      id,
      startConfig,
      [],
      [],
      config?.retry,
    );
  }
}
