import { EventStreamName } from './event-stream-name.valueboject';
import { DomainCommand } from './slice.types';

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export interface ApplicationService {
  execute(streamName: EventStreamName, command: DomainCommand): Promise<void>;
}
