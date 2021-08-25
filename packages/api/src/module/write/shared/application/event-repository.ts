import { ApplicationEvent } from '../../../shared/application-command-events';
import { EventStreamName } from './event-stream-name.valueboject';
import {EventStream, EventStreamVersion} from "./application-service";

export const EVENT_REPOSITORY = Symbol('EVENT_REPOSITORY');

export interface EventRepository {
  read(streamName: EventStreamName): Promise<EventStream>;

  write(
    streamName: EventStreamName,
    events: ApplicationEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<void>;
}
