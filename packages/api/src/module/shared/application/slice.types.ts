import { DomainEvent } from '../domain/domain.event';
import { ApplicationEvent } from './application-command-events';

export type DomainLogic<EventType extends DomainEvent> = (previousEvents: EventType[]) => EventType[];
export type EventStream<EventType extends ApplicationEvent = ApplicationEvent> = EventType[];
export type EventStreamVersion = number;
