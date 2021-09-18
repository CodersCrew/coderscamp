import { ApplicationEvent } from '@/module/application-command-events';

import { StorableEvent } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.value-object';
import { EventStreamVersion } from '../../application/event-stream-version';
import {
  PrismaTransactionClient,
  PrismaTransactionContext,
} from '../../application/prisma-transaction-manager/prisma-transaction-manager';
import { parseStoredEventData, parseStoredEventMetadata } from '../event-repository/prisma-event-repository.service';

type EventId = string;

export class PrismaTransactionEventRepository {
  write(
    streamName: EventStreamName,
    events: StorableEvent[],
    expectedStreamVersion: EventStreamVersion,
    context: PrismaTransactionContext,
  ): EventId[] {
    const databaseEvents = events.map((e, index) => ({
      id: e.id,
      type: e.type,
      streamId: streamName.streamId,
      streamCategory: streamName.streamCategory,
      streamVersion: expectedStreamVersion + 1 + index,
      occurredAt: e.occurredAt,
      data: JSON.stringify(e.data),
      metadata: JSON.stringify({ ...e.metadata, trxId: context.trxId }),
    }));

    context.executeWithTransaction((prisma) => {
      return prisma.eventLock.createMany({
        data: databaseEvents.map((x) => ({
          streamId: x.streamId,
          streamVersion: x.streamVersion,
        })),
      });
    });
    context.executeWithTransaction((prisma) => {
      return prisma.event.createMany({ data: databaseEvents });
    });

    return databaseEvents.map((x) => x.id);
  }

  async readAll(eventsToPublishIds: EventId[], prisma: PrismaTransactionClient): Promise<ApplicationEvent[]> {
    const storedEvents = await prisma.event.findMany({
      where: {
        id: { in: eventsToPublishIds },
      },
      orderBy: {
        globalOrder: 'asc',
      },
    });

    return storedEvents.map((e) => ({
      type: e.type,
      id: e.id,
      occurredAt: e.occurredAt,
      data: parseStoredEventData(e.data),
      metadata: parseStoredEventMetadata(e.metadata),
      streamVersion: e.streamVersion,
      streamName: EventStreamName.from(e.streamCategory, e.streamId),
      globalOrder: e.globalOrder,
    }));
  }
}
