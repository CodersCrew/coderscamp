import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { AnotherSampleDomainEvent, cleanupDatabase, SampleDomainEvent } from '@/shared/test-utils';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { PrismaEventRepository } from '@/write/shared/infrastructure/event-repository/prisma-event-repository.service';

export const sampleDomainEventFactory = (data: Partial<SampleDomainEvent['data']> = {}): SampleDomainEvent => ({
  type: 'SampleDomainEvent',
  data: {
    value1: uuid(),
    value2: Math.random() * 1000,
    ...data,
  },
});

export const anotherSampleDomainEventFactory = (
  data: Partial<AnotherSampleDomainEvent['data']> = {},
): AnotherSampleDomainEvent => ({
  type: 'AnotherSampleDomainEvent',
  data: {
    value1: uuid(),
    value2: Math.random() * 1000,
    ...data,
  },
});

export async function initTestPrismaEventRepository() {
  const app = await Test.createTestingModule({
    imports: [PrismaModule],
  }).compile();

  await app.init();

  const prismaService = app.get<PrismaService>(PrismaService);
  const eventRepository = new PrismaEventRepository(prismaService, { currentTime: () => new Date() });

  await cleanupDatabase(prismaService);

  async function close() {
    await app.close();
    await cleanupDatabase(prismaService);
    await prismaService.$disconnect();
  }

  function randomEventStreamId() {
    return uuid();
  }

  return { eventRepository, randomEventStreamId, close };
}

interface PrismaEventRepositoryConcurrencyTestFixture {
  runConcurrently(
    streamName: EventStreamName,
    storableEvents: StorableEvent[][],
    expectedStreamVersion: number,
  ): Promise<RunConcurrentlyResult>;
  eventRepository: PrismaEventRepository;
}

type RunConcurrentlyResult = {
  writeResults: ApplicationEvent[][];
  errors: ErrorWithEventBatch[];
};

type ErrorWithEventBatch = {
  error: Error;
  eventBatch: StorableEvent[];
};

class PrismaEventRepositoryConcurrencyTestFixtureImpl implements PrismaEventRepositoryConcurrencyTestFixture {
  constructor(public readonly eventRepository: PrismaEventRepository) {}

  async runConcurrently<EventType extends DomainEvent<string, Record<string, unknown>>>(
    streamName: EventStreamName,
    storableEvents: StorableEvent<EventType>[][],
    expectedStreamVersion: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isErrorWithEventBatch = (value: any): value is ErrorWithEventBatch =>
      value !== undefined && value.error !== undefined && value.error instanceof Error;
    const isApplicationEventBatch = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
    ): value is ApplicationEvent<DomainEvent<string, Record<string, unknown>>>[] =>
      value !== undefined && value.error === undefined;
    const promises = storableEvents.map((eventBatch) =>
      this.eventRepository
        .write(streamName, eventBatch, expectedStreamVersion)
        .catch<ErrorWithEventBatch>((error: Error) => ({
          eventBatch,
          error,
        })),
    );
    const results = await Promise.all(promises);
    const writeResults = results.filter(isApplicationEventBatch);
    const errors = results.filter(isErrorWithEventBatch);

    return { writeResults, errors };
  }
}

export async function initConcurrentTestPrismaEventRepository() {
  const app = await Test.createTestingModule({
    imports: [PrismaModule],
  }).compile();

  await app.init();

  const prismaService = app.get<PrismaService>(PrismaService);

  await cleanupDatabase(prismaService);

  const transacation = prismaService.$transaction.bind(prismaService);

  const synchronizationBarier = () => {
    return prismaService.$executeRaw`SELECT pg_sleep(2);`;
  };

  prismaService.$transaction = jest.fn().mockImplementation((array) => {
    return transacation([synchronizationBarier(), ...array]);
  });

  async function close() {
    prismaService.$transaction = transacation;
    await app.close();
    await cleanupDatabase(prismaService);
    await prismaService.$disconnect();
  }

  const eventRepository = new PrismaEventRepository(prismaService, { currentTime: () => new Date() });
  const concurrencyTestFixture: PrismaEventRepositoryConcurrencyTestFixture =
    new PrismaEventRepositoryConcurrencyTestFixtureImpl(eventRepository);

  return {
    close,
    concurrencyTestFixture,
  };
}
