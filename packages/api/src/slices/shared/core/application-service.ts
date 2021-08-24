import { EventStreamName } from './event-stream-name.valueboject';
import { DomainLogic } from './slice.types';

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export type ApplicationExecutionContext = { correlationId: string; causationId?: string };

export interface ApplicationService {
  execute(streamName: EventStreamName, context: ApplicationExecutionContext, command: DomainLogic): Promise<void>;
}
