import { Test } from '@nestjs/testing';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { cleanupDatabase } from '@/shared/test-utils';
import { PrismaEventRepository } from '@/write/shared/infrastructure/event-repository/prisma-event-repository.service';

async function initTestEventsSubscription() {
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

  return { eventRepository, prismaService, randomEventStreamId, close };
}

describe('Events subscription', () => {
  let sut: AsyncReturnType<typeof initTestEventsSubscription>;

  beforeEach(async () => {
    sut = await initTestEventsSubscription();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('test', () => {
    const { eventRepository, prismaService } = sut;

    const

  });
});
