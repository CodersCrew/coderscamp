import { Test } from '@nestjs/testing';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { cleanupDatabase, sequence, storableEvent } from '@/common/test-utils';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { PrismaEventRepository } from '@/write/shared/infrastructure/event-repository/prisma-event-repository.service';

async function initTestPrismaEventRepository() {
  const app = await Test.createTestingModule({
    imports: [PrismaModule],
  }).compile();

  await app.init();

  const prismaService = app.get<PrismaService>(PrismaService);
  const eventRepository = new PrismaEventRepository(prismaService, { currentTime: () => new Date() });

  await cleanupDatabase(prismaService);

  function close() {
    return app.close();
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

  describe('readAll with filter', () => {
    it('filter by eventStreamCategory, eventType, fromGlobalPosition', async () => {
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
      const result = await eventRepository.readAll({
        streamCategory,
        fromGlobalPosition: 100,
        eventType: 'AnotherSampleDomainEvent',
      });

      expect(result.length).toBe(1);
    });
  });
});
