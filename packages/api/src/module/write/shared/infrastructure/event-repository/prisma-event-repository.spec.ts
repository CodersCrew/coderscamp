import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { AnotherSampleDomainEvent, SampleDomainEvent, sequence, storableEvent } from '@/shared/test-utils';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import {
  anotherSampleDomainEventFactory,
  initConcurrentTestPrismaEventRepository,
  initTestPrismaEventRepository,
  sampleDomainEventFactory,
} from './prisma-event-repository.fixture.spec';

describe('Prisma Event Repository', () => {
  let sut: AsyncReturnType<typeof initTestPrismaEventRepository>;

  beforeEach(async () => {
    sut = await initTestPrismaEventRepository();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('reads pastEvents and version from given stream', async () => {
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

    await eventRepository.write(streamName01, [sampleStorableEvent0], 0);
    await eventRepository.write(streamName01, [sampleStorableEvent1], 1);
    await eventRepository.write(streamName2, [sampleStorableEvent2], 0);

    const streamName01Events = await eventRepository.readDomainStream(streamName01);

    const expectedStreamName = [
      { data: sampleStorableEvent0.data, type: sampleStorableEvent0.type },
      { data: sampleStorableEvent1.data, type: sampleStorableEvent1.type },
    ];

    expect(streamName01Events.streamVersion).toEqual(2);
    expect(streamName01Events.pastEvents).toEqual(expectedStreamName);

    const streamName2Events = await eventRepository.readDomainStream(streamName2);

    const expectedStreamName2 = [{ data: sampleStorableEvent2.data, type: sampleStorableEvent2.type }];

    expect(streamName2Events.streamVersion).toEqual(1);
    expect(streamName2Events.pastEvents).toEqual(expectedStreamName2);
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
      ...sampleStorableEvent0,
      streamVersion: 1,
      streamName: streamName01,
      globalOrder: 1,
    };
    const storedEvent1 = {
      ...sampleStorableEvent1,
      streamVersion: 2,
      streamName: streamName01,
      globalOrder: 2,
    };
    const storedEvent2 = {
      ...sampleStorableEvent2,
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

describe('Prisma Event Repository Concurrency Tests', () => {
  let sut: AsyncReturnType<typeof initConcurrentTestPrismaEventRepository>;

  beforeEach(async () => {
    sut = await initConcurrentTestPrismaEventRepository();
  });

  afterEach(async () => {
    await sut.close();
  });

  it(
    'Given multiple users running concurrently on the same stream only one should succeed',
    async () => {
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
    },
    30 * 1000,
  );

  it(
    'Given multiple users running concurrently on diffrent streams all should succeed',
    async () => {
      // Given
      const { concurrencyTestFixture } = sut;
      const streamName0 = EventStreamName.props({ streamCategory: 'SampleEventStreamCategory', streamId: uuid() });
      const streamName1 = EventStreamName.props({ streamCategory: 'SampleEventStreamCategory', streamId: uuid() });
      const streamName2 = EventStreamName.props({ streamCategory: 'SampleEventStreamCategory', streamId: uuid() });
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
    },
    30 * 1000,
  );
});
