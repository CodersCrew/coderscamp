import { Inject, Injectable } from '@nestjs/common';

import { ApplicationEvent } from '@/module/application-command-events';

import { EventStream } from '../../application/application-service';
import { EventRepository, ReadAllFilter, StorableEvent } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.value-object';
import { EventStreamVersion } from '../../application/event-stream-version';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';

@Injectable()
export class InMemoryEventRepository implements EventRepository {
  private eventStreams: { [key: string]: ApplicationEvent[] } = {};

  constructor(@Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider) {}

  async read(streamName: EventStreamName): Promise<EventStream> {
    return this.getEventsBy(streamName).filter((it) => it.occurredAt <= this.timeProvider.currentTime());
  }

  private getEventsBy(eventStreamName: EventStreamName): ApplicationEvent[] {
    return this.eventStreams[eventStreamName.raw] || [];
  }

  async write(
    streamName: EventStreamName,
    events: StorableEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<ApplicationEvent[]> {
    return Promise.all(events.map((value, index) => this.writeOne(streamName, value, expectedStreamVersion + index)));
  }

  private writeOne(
    streamName: EventStreamName,
    event: StorableEvent,
    expectedStreamVersion: EventStreamVersion,
  ): Promise<ApplicationEvent> {
    const foundStream = this.eventStreams[streamName.raw];

    if (foundStream && foundStream.find((e) => e.id === event.id)) {
      return Promise.reject(new Error(`Event stream already contains this event with id ${event.id}!`));
    }

    const streamVersion = !foundStream ? 0 : foundStream.length;

    const storeEvent = {
      ...event,
      globalOrder: this.globalEventsCount() + 1,
      streamName,
      streamVersion: expectedStreamVersion + 1,
    };

    if (!foundStream) {
      if (expectedStreamVersion !== 0) {
        return Promise.reject(new Error(`Event stream was modified concurrently!`));
      }

      this.eventStreams[streamName.raw] = [storeEvent];
    } else {
      if (expectedStreamVersion && expectedStreamVersion !== streamVersion) {
        return Promise.reject(new Error(`Event stream was modified concurrently!`));
      }

      this.eventStreams[streamName.raw].push(storeEvent);
    }

    return Promise.resolve(storeEvent);
  }

  private globalEventsCount(): number {
    return Object.entries(this.eventStreams).reduce((acc, stream) => acc + stream.length, 0);
  }

  async readAll(filter: Partial<ReadAllFilter>): Promise<ApplicationEvent[]> {
    const { streamCategory, eventTypes, fromGlobalPosition } = filter;

    return Object.values(this.eventStreams)
      .reduce((acc, stream) => acc.concat(stream), [])
      .filter((e) => !streamCategory || e.streamName.streamCategory)
      .filter((e) => !eventTypes || eventTypes.includes(e.type))
      .filter((e) => !fromGlobalPosition || e.globalOrder >= fromGlobalPosition)
      .sort((e1, e2) => e1.globalOrder - e2.globalOrder);
  }
}
