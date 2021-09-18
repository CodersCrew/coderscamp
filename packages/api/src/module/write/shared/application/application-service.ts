import { ApplicationCommand, ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';

import { EventStreamName } from './event-stream-name.value-object';

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export type DomainLogic<EventType extends DomainEvent> = (
  pastEvents: EventType[],
) => EventType[] | Promise<EventType[]>;
export type EventStream<EventType extends ApplicationEvent = ApplicationEvent> = EventType[];

export interface ApplicationService {
  execute<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    command: ApplicationCommand,
    domainLogic: DomainLogic<DomainEventType>,
  ): Promise<void>;
}
