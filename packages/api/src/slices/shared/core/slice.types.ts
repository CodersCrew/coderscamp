import { ApplicationEvent } from './slices';

export type DomainCommand = (previousEvents: ApplicationEvent[], currentTime: Date) => ApplicationEvent[];
export type EventStream<EventType extends ApplicationEvent = ApplicationEvent> = EventType[];
export type EventStreamVersion = number;
