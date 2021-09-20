import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PrismaService } from '@/prisma/prisma.service';
import { env } from '@/shared/env';
import { EVENT_REPOSITORY, EventRepository } from '@/write/shared/application/event-repository';
import {
  SubscriptionId,
  SubscriptionOptions,
} from '@/write/shared/application/events-subscription/events-subscription';
import {
  NeedsEventOrPositionHandlers,
  SubscriptionBuilder,
} from '@/write/shared/application/events-subscription/events-subscription-builder';

export interface CanCreateSubscription {
  subscription(id: SubscriptionId, config?: Partial<SubscriptionOptions>): NeedsEventOrPositionHandlers;
}

@Injectable()
export class EventsSubscriptionsRegistry implements CanCreateSubscription {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  subscription(id: SubscriptionId, options?: Partial<SubscriptionOptions>): NeedsEventOrPositionHandlers {
    const defaultSubscriptionConfig: SubscriptionOptions = {
      start: { from: { globalPosition: 1 } },
      queue: {
        maxRetryCount: env.SUBSCRIPTION_QUEUE_MAX_RETRY_COUNT,
        waitingTimeOnRetry: env.SUBSCRIPTION_QUEUE_WAITING_TIME_ON_RETRY_MS,
      },
    };
    const startConfig: SubscriptionOptions = {
      ...defaultSubscriptionConfig,
      ...options,
    };

    return new SubscriptionBuilder(
      this.prismaService,
      this.eventRepository,
      this.eventEmitter,
      id,
      startConfig,
      [],
      [],
    );
  }
}
