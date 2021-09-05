import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';
import {
  CanCreateSubscription,
  EventSubscriptionConfig,
  SubscriptionId,
} from '@/write/shared/application/events-subscription/events-subscription';
import {
  NeedsEventHandlers,
  SubscriptionBuilder,
} from '@/write/shared/application/events-subscription/events-subscription-builder';

const defaultSubscriptionConfig: EventSubscriptionConfig = { from: { globalPosition: 0 }, rebuildOnChange: false };

export class EventsSubscriptions implements CanCreateSubscription {
  constructor(private readonly prismaService: PrismaService, private readonly eventRepository: EventRepository) {}

  subscription(id: SubscriptionId, config?: EventSubscriptionConfig): NeedsEventHandlers {
    const configuration: EventSubscriptionConfig = {
      ...defaultSubscriptionConfig,
      ...config,
    };

    return new SubscriptionBuilder(this.prismaService, this.eventRepository, id, configuration);
  }
}
