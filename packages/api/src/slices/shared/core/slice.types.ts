import { DomainEvent } from '../../write/generate-learning-materials-url/core/generate-learning-materials-url.command-handler';
import { ApplicationEvent } from './slices';

export type DomainLogic = (previousEvents: DomainEvent[]) => DomainEvent[];
export type EventStream<EventType extends ApplicationEvent = ApplicationEvent> = EventType[];
export type EventStreamVersion = number;
