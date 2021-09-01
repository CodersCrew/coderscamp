import { Test } from '@nestjs/testing';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { cleanupDatabase, storableEvent } from '@/common/test-utils';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventStreamVersion } from '@/write/shared/application/event-stream-version';
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
    const streamId = sut.randomEventStreamId();
    const streamName = EventStreamName.props({ streamCategory, streamId });
    const sampleDomainEvent: SampleDomainEvent = {
      type: 'SampleDomainEvent',
      data: {
        value1: 'sampleValue1',
        value2: 123,
      },
    };
    const expectedStreamVersion: EventStreamVersion = 0;
    const sampleStorableEvent = storableEvent<SampleDomainEvent>(streamName, sampleDomainEvent, expectedStreamVersion);

    // When
    const writeResult = await eventRepository.write(streamName, [sampleStorableEvent], expectedStreamVersion);

    // Then
    const storedEvents = [
      {
        type: sampleStorableEvent.type,
        data: sampleStorableEvent.data,
        id: sampleStorableEvent.id,
        occurredAt: sampleStorableEvent.occurredAt,
        metadata: sampleStorableEvent.metadata,
        streamVersion: sampleStorableEvent.streamVersion,
        streamName: sampleStorableEvent.streamName,
        globalOrder: 1,
      },
    ];

    expect(writeResult).toStrictEqual(storedEvents);

    // When
    const readEventStream = await eventRepository.read(streamName);

    expect(readEventStream).toStrictEqual(storedEvents);
  });
});
