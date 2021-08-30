import { Inject, Injectable } from '@nestjs/common';

import { ApplicationEvent, DefaultCommandMetadata } from '@/module/application-command-events';
import { PrismaService } from '@/prisma/prisma.service';

import { EventStream } from '../../application/application-service';
import { EventRepository } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.value-object';
import { EventStreamVersion } from '../../application/event-stream-version';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';

const parseData = (value: unknown): Record<string, unknown> => JSON.parse(typeof value === 'string' ? value : '{}');
const parseMetadata = (value: unknown): DefaultCommandMetadata & Record<string, unknown> => {
  const metadata = JSON.parse(typeof value === 'string' ? value : '{}');

  const hasCorrectCorelationId = 'correlationId' in metadata && typeof metadata.correlationId === 'string';
  const hasCorrectCausationId = !('causationId' in metadata) || typeof metadata.causationId === 'string';

  if (!hasCorrectCorelationId || !hasCorrectCausationId) {
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
    const dbEvents = await this.prismaService.event
      .findMany({ where: { streamId: streamName.streamId } })
      .then((found) => found.filter((it) => it.occurredAt <= this.timeProvider.currentTime()));

    return dbEvents.map((e) => ({
      type: e.type,
      id: e.id,
      occurredAt: e.occurredAt,
      data: parseData(e.data),
      metadata: parseMetadata(e.metadata),
      streamVersion: e.streamVersion,
      streamName,
    }));
  }

  async write(
    streamName: EventStreamName,
    events: ApplicationEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<void> {
    // todo: do it in transaction!
    this.prismaService.$transaction(async (prisma) => {
      const currentStreamVersion = await prisma.event.count({ where: { streamId: streamName.streamId } });

      if (currentStreamVersion !== expectedStreamVersion) {
        throw new Error(
          `Event stream ${streamName.raw} expected version is: ${expectedStreamVersion}, but current version is: ${currentStreamVersion}`,
        );
      }

      const databaseEvents = events.map((e) => ({
        id: e.id,
        type: e.type,
        streamId: streamName.streamId,
        streamCategory: streamName.streamCategory,
        streamVersion: e.streamVersion,
        occurredAt: e.occurredAt,
        data: JSON.stringify(e.data),
        metadata: JSON.stringify(e.metadata),
      }));

      return prisma.event.createMany({ data: databaseEvents });
    });
  }
}
