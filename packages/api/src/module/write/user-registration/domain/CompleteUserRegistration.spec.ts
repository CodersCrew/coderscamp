import { completeUserRegistrationCommand } from '@/module/commands/complete-user-registration';
import { userRegistrationWasCompletedEvent } from '@/module/events/user-registration-was-completed.domain-event';
import { userRegistrationWasStartedEvent } from '@/module/events/user-registration-was-started.domain-event';

import { completeUserRegistration } from './CompleteUserRegistration';

describe('Complete user registration', () => {
  it('create event userRegistrationWasCompleted when completeUserRegistration is invoked and user registration was started', () => {
    // given
    const userId = 'iu3dg23b1;';
    const fullName = 'test name';
    const emailAddress = 'teest@test.pl';
    const hashedPassword = 'testedPassword';
    const command = completeUserRegistrationCommand({ userId });
    const pastEvents = [userRegistrationWasStartedEvent({ userId, fullName, emailAddress, hashedPassword })];

    // when
    const result = completeUserRegistration(command)(pastEvents);
    // then
    const event = userRegistrationWasCompletedEvent({ userId, fullName, emailAddress, hashedPassword });

    expect(result).toEqual([event]);
  });

  it('Throws exception while userRegistrationWasCompleted is invoked, but user registration was not started', () => {
    // given
    const userId = 'iu3dg23b1;';
    const command = completeUserRegistrationCommand({ userId });

    // when - then

    expect(() => completeUserRegistration(command)([])).toThrow(
      'Impossible to complete registration while it is not started',
    );
  });

  it('Throws exception while userRegistrationWasCompleted is invoked, but user registration was already completed', () => {
    // given
    const userId = 'iu3dg23b1;';
    const fullName = 'test name';
    const emailAddress = 'teest@test.pl';
    const hashedPassword = 'testedPassword';
    const command = completeUserRegistrationCommand({ userId });

    const pastEvents = [
      userRegistrationWasStartedEvent({ userId, fullName, emailAddress, hashedPassword }),
      userRegistrationWasCompletedEvent({ userId, fullName, emailAddress, hashedPassword }),
    ];
    // when - then

    expect(() => completeUserRegistration(command)(pastEvents)).toThrow(
      `Registration for user ${fullName} was already completed`,
    );
  });
});
