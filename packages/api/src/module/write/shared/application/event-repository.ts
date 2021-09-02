import { ApplicationEvent, DefaultEventMetadata } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';

import { EventStream } from './application-service';
import { EventStreamName } from './event-stream-name.value-object';
import { EventStreamVersion } from './event-stream-version';

export const EVENT_REPOSITORY = Symbol('EVENT_REPOSITORY');

export type StorableEvent<
  DomainEventType extends DomainEvent = DomainEvent,
  EventMetadata extends DefaultEventMetadata = DefaultEventMetadata,
> = Omit<ApplicationEvent<DomainEventType, EventMetadata>, 'globalOrder'>;

export interface EventRepository {
  read(streamName: EventStreamName): Promise<EventStream>;

  write(
    streamName: EventStreamName,
    events: StorableEvent[],
    expectedStreamVersion: EventStreamVersion,
  ): Promise<ApplicationEvent[]>;
}
