import { Test } from '@nestjs/testing';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { cleanupDatabase, sequence, storableEvent } from '@/shared/test-utils';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { PrismaEventRepository } from '@/write/shared/infrastructure/event-repository/prisma-event-repository.service';

interface ConcurrencyTestFixture {
  setNumberOfConcurrentUsers(value: number): void;
  resetNumberOfConcurrentUsers(value: number): void;
  runConcurrently(
    streamName: EventStreamName,
    storableEvents: StorableEvent[][],
    expectedStreamVersion: number,
  ): Promise<RunConcurrentlyResult>;
  eventRepository: PrismaEventRepository;
  clear(): void;
}

type RunConcurrentlyResult = {
  writeResults: ApplicationEvent[][];
  errors: ErrorWithEventBatch[];
};

type ErrorWithEventBatch = {
  error: Error;
  eventBatch: StorableEvent[];
};

class PrismaEventRepositoryConcurrencyTestFixture extends PrismaEventRepository implements ConcurrencyTestFixture {
  private numberOfConcurrentUsers?: number = undefined;

  private waitingQueue: (() => void)[] = [];

  get eventRepository(): PrismaEventRepository {
    return this;
  }

  setNumberOfConcurrentUsers(value: number): void {
    if (this.numberOfConcurrentUsers !== undefined) {
      throw new Error(
        'Reasigment in setNumberOfConcurrentEvents is not allowed. You need to first call ConcurrencyTestFixture.clear()',
      );
    }

    if (!(Number.isInteger(value) && value > 0)) {
      throw new Error('NumberOfConcurrentEvents must be integer greater than zero');
    }

    this.numberOfConcurrentUsers = value;
  }

  resetNumberOfConcurrentUsers(value: number): void {
    this.clear();
    this.setNumberOfConcurrentUsers(value);
  }

  clear(): void {
    if (this.numberOfConcurrentUsers !== undefined && this.waitingQueue.length !== this.numberOfConcurrentUsers) {
      throw new Error(
        `Not all events were awaited current:${this.waitingQueue.length} expected:${this.numberOfConcurrentUsers}`,
      );
    }

    this.numberOfConcurrentUsers = undefined;
    this.waitingQueue = [];
  }

  protected async thisIsSynchronizationBarierForTestingPurpose(): Promise<void> {
    if (this.numberOfConcurrentUsers === undefined) {
      throw new Error('NumberOfConcurrentEvents not set');
    }

    const promise = new Promise<void>((resolve) => {
      this.waitingQueue.push(resolve);
    });

    if (this.waitingQueue.length > this.numberOfConcurrentUsers) {
      throw new Error('More waiting events than have been set in setNumberOfConcurrentEvents');
    }

    if (this.waitingQueue.length === this.numberOfConcurrentUsers) {
      this.waitingQueue.forEach((resolve) => resolve());
    }

    return promise;
  }

  async runConcurrently<EventType extends DomainEvent<string, Record<string, unknown>>>(
    streamName: EventStreamName,
    storableEvents: StorableEvent<EventType>[][],
    expectedStreamVersion: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isErrorWithEventBatch = (value: any): value is ErrorWithEventBatch =>
      value !== undefined && value.error !== undefined && value.error instanceof Error;
    const isAplicationEventBatch = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
    ): value is ApplicationEvent<DomainEvent<string, Record<string, unknown>>>[] =>
      value !== undefined && value.error === undefined;
    const promises = storableEvents.map((eventBatch) =>
      this.write(streamName, eventBatch, expectedStreamVersion).catch<ErrorWithEventBatch>((error: Error) => ({
        eventBatch,
        error,
      })),
    );
    const results = await Promise.all(promises);
    const writeResults = results.filter(isAplicationEventBatch);
    const errors = results.filter(isErrorWithEventBatch);

    return { writeResults, errors };
  }
}

type PrismaEventRepositoryFactory = (
  ...args: ConstructorParameters<typeof PrismaEventRepository>
) => PrismaEventRepository;

const defaultPrismaEventRepositoryFactory: PrismaEventRepositoryFactory = (prismaService, timeProvider) => {
  return new PrismaEventRepository(prismaService, timeProvider);
};

const prismaEventRepositoryConcurrencyTestFixtureFactory: PrismaEventRepositoryFactory = (
  prismaService,
  timeProvider,
) => {
  return new PrismaEventRepositoryConcurrencyTestFixture(prismaService, timeProvider);
};

async function initTestPrismaEventRepository(
  prismaEventRepositoryFactory: PrismaEventRepositoryFactory = defaultPrismaEventRepositoryFactory,
) {
  const app = await Test.createTestingModule({
    imports: [PrismaModule],
  }).compile();

  await app.init();

  const prismaService = app.get<PrismaService>(PrismaService);
  const eventRepository = prismaEventRepositoryFactory(prismaService, { currentTime: () => new Date() });

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

const sampleDomainEventFactory = (data: Partial<SampleDomainEvent['data']> = {}): SampleDomainEvent => ({
  type: 'SampleDomainEvent',
  data: {
    value1: uuid(),
    value2: Math.random() * 1000,
    ...data,
  },
});

const anotherSampleDomainEventFactory = (
  data: Partial<AnotherSampleDomainEvent['data']> = {},
): AnotherSampleDomainEvent => ({
  type: 'AnotherSampleDomainEvent',
  data: {
    value1: uuid(),
    value2: Math.random() * 1000,
    ...data,
  },
});

describe('Prisma Event Repository', () => {
  let sut: AsyncReturnType<typeof initTestPrismaEventRepository>;

  beforeEach(async () => {
    sut = await initTestPrismaEventRepository();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('write and read single storable event and return application event with globalOrder', async () => {
    // Given
    const { eventRepository } = sut;
    const streamCategory = 'SampleEventStreamCategory';
    const streamName01 = EventStreamName.props({ streamCategory, streamId: sut.randomEventStreamId() });
    const streamName2 = EventStreamName.props({ streamCategory, streamId: sut.randomEventStreamId() });
    const sampleDomainEvent: SampleDomainEvent = {
      type: 'SampleDomainEvent',
      data: {
        value1: 'sampleValue1',
        value2: 123,
      },
    };
    const sampleStorableEvent0 = storableEvent<SampleDomainEvent>(sampleDomainEvent);
    const sampleStorableEvent1 = storableEvent<SampleDomainEvent>(sampleDomainEvent);
    const sampleStorableEvent2 = storableEvent<SampleDomainEvent>(sampleDomainEvent);

    // When
    const writeResult0 = await eventRepository.write(streamName01, [sampleStorableEvent0], 0);
    const writeResult1 = await eventRepository.write(streamName01, [sampleStorableEvent1], 1);
    const writeResult2 = await eventRepository.write(streamName2, [sampleStorableEvent2], 0);

    // Then
    const storedEvent0 = {
      type: sampleStorableEvent0.type,
      data: sampleStorableEvent0.data,
      id: sampleStorableEvent0.id,
      occurredAt: sampleStorableEvent0.occurredAt,
      metadata: sampleStorableEvent0.metadata,
      streamVersion: 1,
      streamName: streamName01,
      globalOrder: 1,
    };
    const storedEvent1 = {
      type: sampleStorableEvent1.type,
      data: sampleStorableEvent1.data,
      id: sampleStorableEvent1.id,
      occurredAt: sampleStorableEvent1.occurredAt,
      metadata: sampleStorableEvent1.metadata,
      streamVersion: 2,
      streamName: streamName01,
      globalOrder: 2,
    };
    const storedEvent2 = {
      type: sampleStorableEvent2.type,
      data: sampleStorableEvent2.data,
      id: sampleStorableEvent2.id,
      occurredAt: sampleStorableEvent2.occurredAt,
      metadata: sampleStorableEvent2.metadata,
      streamVersion: 1,
      streamName: streamName2,
      globalOrder: 3,
    };

    expect(writeResult0).toStrictEqual([storedEvent0]);
    expect(writeResult1).toStrictEqual([storedEvent1]);
    expect(writeResult2).toStrictEqual([storedEvent2]);

    // When
    const readEventStream = await eventRepository.read(streamName01);

    expect(readEventStream).toStrictEqual([storedEvent0, storedEvent1]);
  });

  it('readAll with filter by eventStreamCategory, eventType, fromGlobalPosition', async () => {
    // Given
    const { eventRepository } = sut;
    const streamCategory = 'SampleEventStreamCategory';
    const streamId = sut.randomEventStreamId();
    const streamName = EventStreamName.props({ streamCategory, streamId });

    const sampleDomainEvent: SampleDomainEvent = {
      type: 'SampleDomainEvent',
      data: {
        value1: 'sampleValue1',
        value2: 123,
      },
    };
    const anotherSampleDomainEvent: AnotherSampleDomainEvent = {
      type: 'AnotherSampleDomainEvent',
      data: {
        value1: 'sampleValue1',
        value2: 123,
      },
    };

    const sampleEventsToStore: StorableEvent[] = sequence(50).map(() =>
      storableEvent<SampleDomainEvent>(sampleDomainEvent),
    );
    const anotherSampleEventsToStore: StorableEvent[] = sequence(50).map(() =>
      storableEvent<AnotherSampleDomainEvent>(anotherSampleDomainEvent),
    );

    // When
    await eventRepository.write(streamName, [...sampleEventsToStore, ...anotherSampleEventsToStore], 0);

    // Then
    const result1 = await eventRepository.readAll({
      streamCategory,
      fromGlobalPosition: 99,
      eventTypes: ['SampleDomainEvent', 'AnotherSampleDomainEvent'],
    });

    expect(result1.length).toBe(2);

    // Then
    const result2 = await eventRepository.readAll({});

    expect(result2.length).toBe(100);

    // Then
    const result3 = await eventRepository.readAll({ fromGlobalPosition: 40, eventTypes: ['SampleDomainEvent'] });

    expect(result3.length).toBe(11);

    // Then
    const result4 = await eventRepository.readAll({ fromGlobalPosition: 999 });

    expect(result4.length).toBe(0);
  });
});

async function initConcurrentTestPrismaEventRepository() {
  const sutBase = await initTestPrismaEventRepository(prismaEventRepositoryConcurrencyTestFixtureFactory);
  const concurrencyTestFixture =
    sutBase.eventRepository as PrismaEventRepositoryConcurrencyTestFixture as ConcurrencyTestFixture;

  async function close() {
    concurrencyTestFixture.clear();
    await sutBase.close();
  }

  return {
    close,
    concurrencyTestFixture,
  };
}

describe('Prisma Event Repository Concurrency Tests', () => {
  let sut: AsyncReturnType<typeof initConcurrentTestPrismaEventRepository>;

  beforeEach(async () => {
    sut = await initConcurrentTestPrismaEventRepository();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('Given multiple users running concurrently on the same stream only one should succeed', async () => {
    // Given
    const { concurrencyTestFixture } = sut;
    const streamName = EventStreamName.props({ streamCategory: 'SampleEventStreamCategory', streamId: uuid() });
    const numberOfConcurrentUsers = 3;
    const expectedNumberOfFailedUsers = numberOfConcurrentUsers - 1;
    const sampleStorableEvents0 = [
      storableEvent<SampleDomainEvent>(sampleDomainEventFactory()),
      storableEvent<AnotherSampleDomainEvent>(anotherSampleDomainEventFactory()),
    ];
    const sampleStorableEvents1 = [
      storableEvent<SampleDomainEvent>(sampleDomainEventFactory()),
      storableEvent<SampleDomainEvent>(sampleDomainEventFactory()),
      storableEvent<AnotherSampleDomainEvent>(anotherSampleDomainEventFactory()),
    ];
    const sampleStorableEvents2 = [storableEvent<AnotherSampleDomainEvent>(anotherSampleDomainEventFactory())];

    concurrencyTestFixture.resetNumberOfConcurrentUsers(numberOfConcurrentUsers);

    // When
    const { writeResults, errors } = await concurrencyTestFixture.runConcurrently(
      streamName,
      [sampleStorableEvents0, sampleStorableEvents1, sampleStorableEvents2],
      0,
    );

    // Then
    expect(writeResults.length).toBe(1);
    expect(errors.length).toBe(expectedNumberOfFailedUsers);

    // Then
    const persistetEventsIds = sequence(writeResults[0].length).map((x) => x + 1);
    const streamEvents = await concurrencyTestFixture.eventRepository.read(streamName);

    expect(streamEvents.map((x) => x.streamVersion).sort()).toStrictEqual(persistetEventsIds);

    // Then
    const allEvents = await concurrencyTestFixture.eventRepository.readAll({});

    expect(allEvents.map((x) => x.globalOrder).sort()).toStrictEqual(persistetEventsIds);
  });

  it('Given multiple users running concurrently on diffrent streams all should succeed', async () => {
    // Given
    const { concurrencyTestFixture } = sut;
    const streamName0 = EventStreamName.props({ streamCategory: 'SampleEventStreamCategory', streamId: uuid() });
    const streamName1 = EventStreamName.props({ streamCategory: 'SampleEventStreamCategory', streamId: uuid() });
    const streamName2 = EventStreamName.props({ streamCategory: 'SampleEventStreamCategory', streamId: uuid() });
    const numberOfConcurrentUsers = 3;
    const sampleStorableEvents0 = [
      storableEvent<SampleDomainEvent>(sampleDomainEventFactory()),
      storableEvent<AnotherSampleDomainEvent>(anotherSampleDomainEventFactory()),
    ];
    const sampleStorableEvents1 = [
      storableEvent<SampleDomainEvent>(sampleDomainEventFactory()),
      storableEvent<SampleDomainEvent>(sampleDomainEventFactory()),
      storableEvent<AnotherSampleDomainEvent>(anotherSampleDomainEventFactory()),
    ];
    const sampleStorableEvents2 = [storableEvent<AnotherSampleDomainEvent>(anotherSampleDomainEventFactory())];

    concurrencyTestFixture.resetNumberOfConcurrentUsers(numberOfConcurrentUsers);

    // When
    const [result0, result1, result2] = await Promise.all([
      concurrencyTestFixture.runConcurrently(streamName0, [sampleStorableEvents0], 0),
      concurrencyTestFixture.runConcurrently(streamName1, [sampleStorableEvents1], 0),
      concurrencyTestFixture.runConcurrently(streamName2, [sampleStorableEvents2], 0),
    ]);

    // Then
    expect(result0.writeResults.length).toBe(1);
    expect(result0.errors.length).toBe(0);
    expect(result1.writeResults.length).toBe(1);
    expect(result1.errors.length).toBe(0);
    expect(result2.writeResults.length).toBe(1);
    expect(result2.errors.length).toBe(0);

    // Then
    const [streamEvents0, streamEvents1, streamEvents2] = await Promise.all([
      concurrencyTestFixture.eventRepository.read(streamName0),
      concurrencyTestFixture.eventRepository.read(streamName1),
      concurrencyTestFixture.eventRepository.read(streamName2),
    ]);

    expect(streamEvents0.map((x) => x.streamVersion).sort()).toStrictEqual([1, 2]);
    expect(streamEvents1.map((x) => x.streamVersion).sort()).toStrictEqual([1, 2, 3]);
    expect(streamEvents2.map((x) => x.streamVersion).sort()).toStrictEqual([1]);

    // Then
    const allEvents = await concurrencyTestFixture.eventRepository.readAll({});

    expect(allEvents.map((x) => x.globalOrder).sort()).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
