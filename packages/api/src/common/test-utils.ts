import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventStreamVersion } from '@/write/shared/application/event-stream-version';

import { AppModule } from '../app.module';

export async function cleanupDatabase(prismaService: PrismaService) {
  await Promise.all(
    Object.values(prismaService).map((table) => (table?.deleteMany ? table.deleteMany() : Promise.resolve())),
  );

  await prismaService.$executeRaw`ALTER SEQUENCE "Event_globalOrder_seq" RESTART WITH 1`;
}

export async function initReadTestModule() {
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

export function storableEvent<EventType extends DomainEvent>(
  eventStreamName: EventStreamName,
  event: EventType,
  streamVersion: EventStreamVersion,
): StorableEvent<EventType> {
  return {
    ...event,
    id: uuid(),
    occurredAt: new Date(),
    metadata: { correlationId: uuid(), causationId: uuid() },
    streamVersion,
    streamName: eventStreamName,
  };
}
