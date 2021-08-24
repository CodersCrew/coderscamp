import { EventStreamName } from './event-stream-name.valueboject';
import { ApplicationEvent } from './slices';
import {EventStream, EventStreamVersion} from "./slice.types";

export const EVENT_STORE = Symbol('EVENT_STORE');

export interface EventRepository {
  read(streamName: EventStreamName): Promise<EventStream>;

  write(streamName: EventStreamName, events: ApplicationEvent[], expectedStreamVersion: EventStreamVersion): Promise<void>;
}
