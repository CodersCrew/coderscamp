import { ApplicationEvent } from '../../../shared/application-command-events';
import { DomainEvent } from '../../../shared/domain.event';
import { EventStreamName } from './event-stream-name.valueboject';

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export type ApplicationExecutionContext = { correlationId: string; causationId?: string };

export type DomainLogic<EventType extends DomainEvent> = (pastEvents: EventType[]) => EventType[];
export type EventStream<EventType extends ApplicationEvent = ApplicationEvent> = EventType[];
export type EventStreamVersion = number;

export interface ApplicationService {
  execute<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    context: ApplicationExecutionContext,
    domainLogic: DomainLogic<DomainEventType>,
  ): Promise<void>;
}
