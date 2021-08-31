import { Test } from '@nestjs/testing';

import { PrismaService } from '@/common/prisma/prisma.service';
import { ApplicationEvent } from '@/module/application-command-events';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';

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
  function eventOccurred(event: ApplicationEvent): void {
    eventBus.publishAll([event]);
  }

  return { prismaService, close, eventOccurred };
}
