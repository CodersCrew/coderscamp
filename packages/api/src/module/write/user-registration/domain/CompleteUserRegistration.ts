import { CompleteUserRegistration } from '@/commands/complete-user-registration';
import { userRegistrationWasCompletedEvent } from '@/events/user-registration-was-completed.domain-event';
import { UserRegistrationDomainEvent } from '@/write/user-registration/domain/events';

export const completeUserRegistration =
  (command: CompleteUserRegistration) =>
  (pastEvents: UserRegistrationDomainEvent[]): UserRegistrationDomainEvent[] => {
    const { data } = command;
    const lastUserRegistrationEvent = pastEvents[pastEvents.length - 1];

    if (!lastUserRegistrationEvent) throw new Error('Impossible to complete registration while it is not started');

    if (lastUserRegistrationEvent.type === 'UserRegistrationWasCompleted')
      throw new Error(`Registration for user ${lastUserRegistrationEvent.data.fullName} was already completed`);

    const { fullName, emailAddress, hashedPassword } = lastUserRegistrationEvent.data;
    const userRegistrationWasCompleted = userRegistrationWasCompletedEvent({
      userId: data.userId,
      fullName,
      emailAddress,
      hashedPassword,
    });

    return [userRegistrationWasCompleted];
  };
