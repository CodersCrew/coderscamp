import { DomainEvent } from '../domain/domain.event';
import { EventStreamName } from './event-stream-name.valueboject';
import { DomainLogic } from './slice.types';

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export type ApplicationExecutionContext = { correlationId: string; causationId?: string };

export interface ApplicationService {
  execute<EventType extends DomainEvent>(
    streamName: EventStreamName,
    context: ApplicationExecutionContext,
    domainLogic: DomainLogic<EventType>,
  ): Promise<void>;
}
