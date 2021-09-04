import { PrismaClient } from '@prisma/client';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { EventRepository } from '@/write/shared/application/event-repository';

export interface EventSubscriptionConfig {
  id: string;
  eventTypes: string[];
  fromPosition: number;
}

export type PrismaTransactionManager = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

export class EventsSubscription {
  constructor(
    private readonly config: EventSubscriptionConfig,
    private readonly prismaService: PrismaService,
    private readonly eventRepository: EventRepository,
  ) {}

  handleEvent<DomainEventType extends DomainEvent>(
    event: ApplicationEvent<DomainEventType>,
    handlerFn: (prisma: PrismaTransactionManager, event: ApplicationEvent<DomainEventType>) => Promise<void>,
  ) {
    const subscriptionId = this.config.id;

    this.prismaService.$transaction(async (prisma) => {
      const subscription = await prisma.eventsSubscription.findUnique({ where: { id: subscriptionId } });
      const currentPosition = subscription?.currentPosition ?? this.config.fromPosition - 1;

      if (event.globalOrder >= currentPosition) {
        await handlerFn(prisma, event);
        await prisma.eventsSubscription.upsert({
          where: {
            id: subscriptionId,
          },
          create: {
            id: subscriptionId,
            eventTypes: this.config.eventTypes,
            position: event.globalOrder,
          },
          update: {
            position: event.globalOrder,
          },
        });
      }
    });
  }
}
