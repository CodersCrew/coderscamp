import { DomainEvent } from './slices';

export type DomainCommand = (previousEvents: DomainEvent[], currentTime: Date) => DomainEvent[];
export type EventStream<EventType extends DomainEvent = DomainEvent> = EventType[];
export type EventStreamVersion = number;
