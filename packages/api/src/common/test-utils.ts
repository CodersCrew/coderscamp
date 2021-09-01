import { Test } from '@nestjs/testing';

import { PrismaService } from '@/prisma/prisma.service';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { StorableEvent } from '@/write/shared/application/event-repository';

import { AppModule } from '../app.module';

export async function cleanupDatabase(prismaService: PrismaService) {
  await Promise.all(
    Object.values(prismaService).map((table) => (table?.deleteMany ? table.deleteMany() : Promise.resolve())),
  );
}

export async function initTestModule() {
  const app = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  await app.init();

  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);
  const prismaService = app.get<PrismaService>(PrismaService);

  await cleanupDatabase(prismaService);

  async function close() {
    await app.close();
  }

  let publishedEvents = 0;

  function eventOccurred(event: StorableEvent): void {
    eventBus.publishAll([{ ...event, globalOrder: (publishedEvents += 1) }]);
  }

  return { prismaService, close, eventOccurred };
}
