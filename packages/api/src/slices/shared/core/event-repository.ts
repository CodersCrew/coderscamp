import { EventStreamName } from './event-stream-name.valueboject';
import { EventStream, EventStreamVersion } from './slice.types';
import { ApplicationEvent } from './slices';

export const EVENT_STORE = Symbol('EVENT_STORE');

export interface EventRepository {
  read(streamName: EventStreamName): Promise<EventStream>;

  write(
    streamName: EventStreamName,
    events: ApplicationEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<void>;
}
