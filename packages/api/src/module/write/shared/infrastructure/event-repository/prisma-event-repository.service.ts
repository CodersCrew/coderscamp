import { Inject, Injectable } from '@nestjs/common';

import { ApplicationEvent, DefaultCommandMetadata } from '@/module/application-command-events';
import { PrismaService } from '@/prisma/prisma.service';

import { EventStream } from '../../application/application-service';
import { EventRepository, ReadAllFilter, StorableEvent } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.value-object';
import { EventStreamVersion } from '../../application/event-stream-version';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';

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
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
  ) {}

  async read(streamName: EventStreamName): Promise<EventStream> {
    const dbEvents = await this.prismaService.event.findMany({
      where: { streamId: streamName.streamId, occurredAt: { lte: this.timeProvider.currentTime() } },
      orderBy: { globalOrder: 'asc' },
    });

    return dbEvents.map((e) => ({
      type: e.type,
      id: e.id,
      occurredAt: e.occurredAt,
      data: parseData(e.data),
      metadata: parseMetadata(e.metadata),
      streamVersion: e.streamVersion,
      streamName: EventStreamName.from(e.streamCategory, e.streamId),
      globalOrder: e.globalOrder,
    }));
  }

  async write(
    streamName: EventStreamName,
    events: StorableEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<ApplicationEvent[]> {
    const databaseEvents = events.map((e, index) => ({
      id: e.id,
      type: e.type,
      streamId: streamName.streamId,
      streamCategory: streamName.streamCategory,
      streamVersion: expectedStreamVersion + 1 + index,
      occurredAt: e.occurredAt,
      data: JSON.stringify(e.data),
      metadata: JSON.stringify(e.metadata),
    }));

    // HACK: This is workaround, because of bug in prisma implementation: https://github.com/prisma/prisma/issues/8707
    await this.prismaService.$transaction([
      this.prismaService.eventLock.createMany({
        data: databaseEvents.map((x) => ({
          streamId: x.streamId,
          streamVersion: x.streamVersion,
        })),
      }),
      this.prismaService.event.createMany({ data: databaseEvents }),
    ]);

    const storedEvents = await this.prismaService.event.findMany({
      where: {
        id: { in: databaseEvents.map((e) => e.id) },
      },
      orderBy: {
        globalOrder: 'asc',
      },
    });

    return storedEvents.map((e) => ({
      type: e.type,
      id: e.id,
      occurredAt: e.occurredAt,
      data: parseData(e.data),
      metadata: parseMetadata(e.metadata),
      streamVersion: e.streamVersion,
      streamName: EventStreamName.from(e.streamCategory, e.streamId),
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
      streamCategory: filter.streamCategory,
      type: filter.eventTypes ? { in: filter.eventTypes } : undefined,
    };
    const storedEvents = await this.prismaService.event.findMany({
      where,
      orderBy: { globalOrder: 'asc' },
    });

    return storedEvents.map((e) => ({
      type: e.type,
      id: e.id,
      occurredAt: e.occurredAt,
      data: parseData(e.data),
      metadata: parseMetadata(e.metadata),
      streamVersion: e.streamVersion,
      streamName: EventStreamName.from(e.streamCategory, e.streamId),
      globalOrder: e.globalOrder,
    }));
  }
}
