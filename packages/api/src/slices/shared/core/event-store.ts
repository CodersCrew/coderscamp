import { EventStream, EventStreamVersion } from './application-service';
import { EventStreamName } from './event-stream-name.valueboject';
import { DomainEvent } from './slices';

export const EVENT_STORE = Symbol('EVENT_STORE');

export interface EventStore {
  read(streamName: EventStreamName): Promise<EventStream>;

  write(streamName: EventStreamName, events: DomainEvent[], expectedStreamVersion: EventStreamVersion): Promise<void>;
}
