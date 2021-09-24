import { PrismaClient } from '@prisma/client';

import { ApplicationEvent } from '@/module/application-command-events';

export type EventsSubscriptionPositionPointerOptions = {
  readonly subscriptionId: string;
  readonly handlingEventTypes: string[];
  readonly startFromGlobalPosition: number;
};

export class EventsSubscriptionPositionPointer {
  private constructor(
    private readonly prismaClient: PrismaClient,
    private currentPosition: number,
    private readonly options: EventsSubscriptionPositionPointerOptions,
  ) {}

  get current() {
    return this.currentPosition;
  }

  static async initialize(
    prismaClient: PrismaClient,
    options: EventsSubscriptionPositionPointerOptions,
  ): Promise<EventsSubscriptionPositionPointer> {
    const subscriptionState = await prismaClient.eventsSubscription.findUnique({
      where: { id: options.subscriptionId },
    });

    const currentPosition = await EventsSubscriptionPositionPointer.ensureNoGaps(
      prismaClient,
      subscriptionState?.currentPosition ?? options.startFromGlobalPosition - 1,
    );

    return new EventsSubscriptionPositionPointer(prismaClient, currentPosition, options);
  }

  private static async ensureNoGaps(prismaClient: PrismaClient, expectedPosition: number): Promise<number> {
    const events = await prismaClient.event.findMany({
      select: {
        globalOrder: true,
      },
      take: 2,
      where: {
        globalOrder: {
          gte: expectedPosition,
        },
      },
      orderBy: {
        globalOrder: 'asc',
      },
    });

    if (events.length <= 1) {
      return expectedPosition;
    }

    return (events[0].globalOrder > expectedPosition ? events[0].globalOrder : events[1].globalOrder) - 1;
  }

  eventWasProcessed(event: ApplicationEvent): boolean {
    const expectedEventPosition = this.currentPosition + 1;

    return event.globalOrder < expectedEventPosition;
  }

  globalOrderIsPreserved(event: ApplicationEvent): boolean {
    const expectedEventPosition = this.currentPosition + 1;

    return event.globalOrder === expectedEventPosition;
  }

  increment(): Promise<void> {
    return this.moveCurrentPosition(this.currentPosition + 1);
  }

  private async moveCurrentPosition(position: number): Promise<void> {
    await this.prismaClient.eventsSubscription.upsert({
      where: {
        id: this.options.subscriptionId,
      },
      create: {
        id: this.options.subscriptionId,
        eventTypes: this.options.handlingEventTypes,
        fromPosition: this.options.startFromGlobalPosition,
        currentPosition: position,
      },
      update: {
        currentPosition: position,
        eventTypes: this.options.handlingEventTypes,
      },
    });
    this.currentPosition = position;
  }
}
