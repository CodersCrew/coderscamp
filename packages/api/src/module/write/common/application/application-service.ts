import { DomainEvent } from '../../../shared/domain.event';
import { EventStreamName } from './event-stream-name.valueboject';
import { DomainLogic } from './slice.types';

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export type ApplicationExecutionContext = { correlationId: string; causationId?: string };

export interface ApplicationService {
  execute<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    context: ApplicationExecutionContext,
    domainLogic: DomainLogic<DomainEventType>,
  ): Promise<void>;
}
