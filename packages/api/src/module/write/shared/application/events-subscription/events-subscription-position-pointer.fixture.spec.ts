import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { PrismaService } from '@/shared/prisma/prisma.service';
import { cleanupDatabase, sampleDomainEvent, storableEvent } from '@/shared/test-utils';

import { EventsSubscriptionPositionPointer } from './events-subscription-position-pointer';

export function initEventsSubscriptionPositionPointerTestFixture() {
  const subscriptionId = uuid();
  const handlingEventTypes = ['SampleDomainEvent'];
  const prismaClient = new PrismaClient();
  const streamId = uuid();
  const streamCategory = uuid();

  function sutFactory({ startFromGlobalPosition } = { startFromGlobalPosition: 0 }) {
    return EventsSubscriptionPositionPointer.initialize(prismaClient, {
      subscriptionId,
      handlingEventTypes,
      startFromGlobalPosition,
    });
  }

  function getSubscription() {
    return prismaClient.eventsSubscription.findUnique({
      where: {
        id: subscriptionId,
      },
    });
  }

  async function expectSubscriptionPosition(expected: number) {
    const subscription = await getSubscription();

    expect(subscription).not.toBeNull();
    expect(subscription).toEqual(expect.objectContaining({ currentPosition: expected }));
  }

  async function assertSubscriptionNotExists() {
    const subscription = await getSubscription();

    expect(subscription).toBeNull();
  }

  async function ensureSubscriptionExists(position: number) {
    await prismaClient.eventsSubscription.create({
      data: {
        id: subscriptionId,
        eventTypes: handlingEventTypes,
        currentPosition: position,
        fromPosition: 0,
      },
    });
    await expectSubscriptionPosition(position);
  }

  afterEach(async () => {
    await cleanupDatabase(prismaClient as PrismaService);
    await prismaClient.$disconnect();
  });

  async function ensureEventsWithGapBetween(count: number, gap: { start: number; end: number }) {
    const events = _.times(count, (i) => ({
      ...storableEvent(sampleDomainEvent()),
      streamId,
      streamCategory,
      streamVersion: i,
    }));

    await prismaClient.event.createMany({
      data: events,
    });

    await prismaClient.event.deleteMany({
      where: {
        AND: [
          {
            globalOrder: {
              gte: gap.start,
            },
          },
          {
            globalOrder: {
              lte: gap.end,
            },
          },
        ],
      },
    });
  }

  return {
    sutFactory,
    ensureSubscriptionExists,
    ensureEventsWithGapBetween,
    assertSubscriptionNotExists,
    expectSubscriptionPosition,
  };
}
