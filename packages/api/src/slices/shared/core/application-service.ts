import {EventStreamName} from './event-stream-name.valueboject';
import {DomainCommand} from './slice.types';

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export interface ApplicationService {
  execute(streamName: EventStreamName, command: DomainCommand): Promise<void>;
}

//
// protected
// recreateEventFromStorage(event
// :
// StorageEventEntry
// ):
// DomainEvent
// {
//   try {
//     return new InvitingApplicantsDomainEvents[event.eventType](
//       DomainEventId.of(event.eventId),
//       event.occurredAt,
//       ApplicantInvitationId.of(event.streamId),
//       event.data,
//     );
//   } catch (error) {
//     throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
//   }
// }
//
// export const InvitingApplicantsDomainEvents = {
//   ApplicantInvited,
//   InvitingApplicantFailed,
//   InvitationCancelled,
//   CancelingApplicantInvitationFailed,
// };
// */
