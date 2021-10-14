import { RegisterUser } from '@/commands/register-user';
import { UserRegistrationWasStarted } from '@/events/user-registration-was-started.domain-event';
import { UserRegistrationDomainEvent } from '@/write/user-registration/domain/events';

export function registerUser(
  _pastEvents: UserRegistrationDomainEvent[],
  command: Omit<RegisterUser, 'plainPassword'>,
  hashedPassword: string,
): UserRegistrationDomainEvent[] {
  const { data } = command;
  const userRegistrationWasStarted: UserRegistrationWasStarted = {
    type: 'UserRegistrationWasStarted',
    data: {
      userId: data.userId,
      fullName: data.fullName,
      emailAddress: data.emailAddress,
      hashedPassword,
    },
  };

  return [userRegistrationWasStarted];
}
