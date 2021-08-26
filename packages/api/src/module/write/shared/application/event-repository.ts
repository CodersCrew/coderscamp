import { ApplicationEvent } from '../../../shared/application-command-events';
import { EventStream } from './application-service';
import { EventStreamName } from './event-stream-name.valueboject';
import { EventStreamVersion } from './event-stream-version';

export const EVENT_REPOSITORY = Symbol('EVENT_REPOSITORY');

export interface EventRepository {
  read(streamName: EventStreamName): Promise<EventStream>;

  write(
    streamName: EventStreamName,
    events: ApplicationEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<void>;
}
