import { Inject, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { EventRepository } from './event-repository';
import { EventStreamName } from './event-stream-name.valueboject';
import { EventStream, EventStreamVersion } from './slice.types';
import { DomainEvent } from './slices';
import { TIME_PROVIDER, TimeProvider } from './time-provider.port';

@Injectable()
export class InMemoryEventRepository implements EventRepository {
  private eventStreams: { [key: string]: DomainEvent[] } = {};

  constructor(@Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider) {}

  async read(streamName: EventStreamName): Promise<EventStream> {
    return this.getEventsBy(streamName).filter((it) => dayjs(it.occurredAt).isBefore(this.timeProvider.currentTime()));
  }

  private getEventsBy(eventStreamName: EventStreamName): DomainEvent[] {
    return this.eventStreams[eventStreamName.raw] || [];
  }

  write(streamName: EventStreamName, events: DomainEvent[], expectedStreamVersion: EventStreamVersion): Promise<void> {
    return Promise.all(
      events.map((value, index) => this.writeOne(streamName, value, expectedStreamVersion + index)),
    ).then();
  }

  writeOne(streamName: EventStreamName, event: DomainEvent, expectedStreamVersion: EventStreamVersion): Promise<void> {
    const foundStream = this.eventStreams[streamName.raw];

    if (foundStream && foundStream.find((e) => e.id === event.id)) {
      return Promise.reject(new Error(`Event stream already contains this event with id ${event.id}!`));
    }

    const streamVersion = !foundStream ? 0 : foundStream.length;

    if (!foundStream) {
      if (expectedStreamVersion !== 0) {
        return Promise.reject(new Error(`Event stream was modified concurrently!`));
      }

      this.eventStreams[streamName.raw] = [event];
    } else {
      if (expectedStreamVersion && expectedStreamVersion !== streamVersion) {
        return Promise.reject(new Error(`Event stream was modified concurrently!`));
      }

      this.eventStreams[streamName.raw].push(event);
    }
  }
}
