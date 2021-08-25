import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../../prisma/prisma.service';
import { ApplicationEvent } from '../../application/application-command-events';
import { EventRepository } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.valueboject';
import { EventStream, EventStreamVersion } from '../../application/slice.types';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';

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
      data: JSON.parse(e.data as string),
      metadata: JSON.parse(e.metadata as string),
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
    const currentStreamVersion = await this.prismaService.event.count({ where: { streamId: streamName.streamId } });

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

    await this.prismaService.event.createMany({ data: databaseEvents });
  }
}
