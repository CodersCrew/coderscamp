import { EventStreamName } from './event-stream-name.valueboject';
import { DomainLogic } from './slice.types';
import {DomainEvent} from "../../write/generate-learning-materials-url/core/generate-learning-materials-url.command-handler";

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export type ApplicationExecutionContext = { correlationId: string; causationId?: string };

export interface ApplicationService {
  execute<EventType extends DomainEvent>(
    streamName: EventStreamName,
    context: ApplicationExecutionContext,
    domainLogic: DomainLogic<EventType>,
  ): Promise<void>;
}
