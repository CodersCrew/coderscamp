import { Injectable } from '@nestjs/common';
import { Event, Stream } from '@prisma/client';

import { ApplicationEvent, DefaultCommandMetadata } from '@/module/application-command-events';
import { PrismaService } from '@/prisma/prisma.service';

import { EventStream } from '../../application/application-service';
import { EventRepository, ReadAllFilter, StorableEvent } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.value-object';
import { EventStreamVersion } from '../../application/event-stream-version';

const parseData = (value: unknown): Record<string, unknown> => JSON.parse(typeof value === 'string' ? value : '{}');
const parseMetadata = (value: unknown): DefaultCommandMetadata & Record<string, unknown> => {
  const metadata = JSON.parse(typeof value === 'string' ? value : '{}');

  const hasCorrectCorrelationId = 'correlationId' in metadata && typeof metadata.correlationId === 'string';
  const hasCorrectCausationId = !('causationId' in metadata) || typeof metadata.causationId === 'string';

  if (!hasCorrectCorrelationId || !hasCorrectCausationId) {
    throw new Error('Wrong format of the metadata JSON');
  }

  return metadata;
};

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async read(streamName: EventStreamName): Promise<EventStream> {
    const dbEvents = await this.prismaService.stream
      .findMany({
        where: { streamId: streamName.streamId },
        orderBy: { event: { globalOrder: 'asc' } },
        include: { event: true },
      })
      .then((events) =>
        events.map((streamEntry) => {
          if (streamEntry.event === null) {
            throw new Error(`Invalid database state. Event is empty for stream(${JSON.stringify(streamEntry)}})`);
          }

          return streamEntry as unknown as Stream & { event: Event };
        }),
      );

    return dbEvents.map((s) => ({
      type: s.event.type,
      id: s.event.id,
      occurredAt: s.event.occurredAt,
      data: parseData(s.event.data),
      metadata: parseMetadata(s.event.metadata),
      streamVersion: s.streamVersion,
      streamName: EventStreamName.from(s.streamCategory, s.streamId),
      globalOrder: s.event.globalOrder,
    }));
  }

  async write(
    streamName: EventStreamName,
    events: StorableEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<ApplicationEvent[]> {
    const databaseStreams = events.map((e, index) => ({
      streamId: streamName.streamId,
      streamCategory: streamName.streamCategory,
      streamVersion: expectedStreamVersion + 1 + index,
      eventId: e.id,
    }));

    const databaseEvents = events.map((e) => ({
      id: e.id,
      type: e.type,
      occurredAt: e.occurredAt,
      data: JSON.stringify(e.data),
      metadata: JSON.stringify(e.metadata),
    }));

    // HACK: This is workaround, because of bug in prisma implementation: https://github.com/prisma/prisma/issues/8707
    await this.prismaService.$transaction([
      this.prismaService.stream.createMany({ data: databaseStreams.map((x) => ({ ...x, eventId: null })) }),
      this.prismaService.event.createMany({ data: databaseEvents }),
      ...databaseStreams.map((x) =>
        this.prismaService.stream.update({
          // streamId_streamVersion is prisma auto generated field
          // eslint-disable-next-line @typescript-eslint/naming-convention
          where: { streamId_streamVersion: { streamId: x.streamId, streamVersion: x.streamVersion } },
          data: { eventId: x.eventId },
        }),
      ),
    ]);

    const storedEvents = await this.prismaService.event.findMany({
      where: {
        Stream: {
          every: {
            streamId: streamName.streamId,
          },
        },
        id: { in: databaseEvents.map((e) => e.id) },
      },
      orderBy: {
        globalOrder: 'asc',
      },
      include: {
        Stream: true,
      },
    });

    return storedEvents.map((e) => ({
      type: e.type,
      id: e.id,
      occurredAt: e.occurredAt,
      data: parseData(e.data),
      metadata: parseMetadata(e.metadata),
      streamVersion: e.Stream[0].streamVersion,
      streamName: EventStreamName.from(streamName.streamCategory, streamName.streamId),
      globalOrder: e.globalOrder,
    }));
  }

  async readAll(filter: Partial<ReadAllFilter>): Promise<ApplicationEvent[]> {
    const where = {
      globalOrder: filter.fromGlobalPosition
        ? {
            gte: filter.fromGlobalPosition ?? 0,
          }
        : undefined,
      Stream: {
        every: {
          streamCategory: filter.streamCategory,
        },
      },
      type: filter.eventTypes ? { in: filter.eventTypes } : undefined,
    };
    const storedEvents = await this.prismaService.event.findMany({
      where,
      orderBy: { globalOrder: 'asc' },
      include: { Stream: true },
    });

    return storedEvents.map((e) => ({
      type: e.type,
      id: e.id,
      occurredAt: e.occurredAt,
      data: parseData(e.data),
      metadata: parseMetadata(e.metadata),
      streamVersion: e.Stream[0].streamVersion,
      streamName: EventStreamName.from(e.Stream[0].streamCategory, e.Stream[0].streamId),
      globalOrder: e.globalOrder,
    }));
  }
}
