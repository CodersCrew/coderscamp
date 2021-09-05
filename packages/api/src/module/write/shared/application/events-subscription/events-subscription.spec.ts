import { Test } from '@nestjs/testing';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { cleanupDatabase } from '@/shared/test-utils';
import { EventsSubscriptions } from '@/write/shared/application/events-subscription/events-subscriptions';
import { PrismaEventRepository } from '@/write/shared/infrastructure/event-repository/prisma-event-repository.service';

async function initTestEventsSubscription() {
  const app = await Test.createTestingModule({
    imports: [PrismaModule],
  }).compile();

  await app.init();

  const prismaService = app.get<PrismaService>(PrismaService);
  const eventRepository = new PrismaEventRepository(prismaService, { currentTime: () => new Date() });
  const eventsSubscriptions = new EventsSubscriptions(prismaService, eventRepository);

  await cleanupDatabase(prismaService);

  function close() {
    return app.close();
  }

  function randomEventStreamId() {
    return uuid();
  }

  return { eventsSubscriptions, randomEventStreamId, close };
}

type SampleDomainEvent = {
  type: 'SampleDomainEvent';
  data: {
    value1: string;
    value2: number;
  };
};

type AnotherSampleDomainEvent = {
  type: 'AnotherSampleDomainEvent';
  data: {
    value1: string;
    value2: number;
  };
};

describe('Events subscription', () => {
  let sut: AsyncReturnType<typeof initTestEventsSubscription>;

  beforeEach(async () => {
    sut = await initTestEventsSubscription();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('test', () => {
    const { eventsSubscriptions } = sut;

    const subscriptionId = 'sample-sub-id';
    const subscription = eventsSubscriptions
      .subscription(subscriptionId)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', (e) => console.log(e))
      .build();
  });
});
