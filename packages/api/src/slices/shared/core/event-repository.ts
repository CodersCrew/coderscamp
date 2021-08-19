import { EventStreamName } from './event-stream-name.valueboject';
import { DomainEvent } from './slices';
import {EventStream, EventStreamVersion} from "./slice.types";

export const EVENT_STORE = Symbol('EVENT_STORE');

export interface EventRepository {
  read(streamName: EventStreamName): Promise<EventStream>;

  write(streamName: EventStreamName, events: DomainEvent[], expectedStreamVersion: EventStreamVersion): Promise<void>;
}
