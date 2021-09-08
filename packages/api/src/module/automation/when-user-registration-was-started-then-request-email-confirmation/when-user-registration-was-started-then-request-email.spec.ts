import { AsyncReturnType } from 'type-fest';

import { RequestEmailConfirmation } from '@/commands/request-email-conformation';
import { UserRegistrationWasStarted } from '@/module/events/user-registration-was-started.domain-event';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationTestModule } from './when-user-registration-was-started-then-request-email.test-module';

const UserRegistrationWasStartedEvent = (data: UserRegistrationWasStarted['data']): UserRegistrationWasStarted => {
  return {
    type: 'UserRegistrationWasStarted',
    data,
  };
};

describe('Email confirmation', () => {
  let moduleUnderTest: AsyncReturnType<
    typeof WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationTestModule
  >;

  beforeEach(async () => {
    moduleUnderTest = await WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('RequestEmailConfirmation when UserRegistrationWasStarted', async () => {
    // Given
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const fullName = 'test user';
    const emailAddress = 'testUser@test.pl';
    const hashedPassword = '41c2c1fc8f6cdc15.d5ee8246071726582172f83d569287951a0d727c94dfc35e291fe17abec789c2';

    const event = UserRegistrationWasStartedEvent({ userId, fullName, emailAddress, hashedPassword });

    // Then
    await moduleUnderTest.eventOccurred(EventStreamName.from('UserRegistration', userId), event);

    await moduleUnderTest.expectCommandExecutedLastly<RequestEmailConfirmation>({
      type: 'RequestEmailConfirmation',
      data: {
        userId,
        confirmationFor: 'user-registration',
        confirmationToken: moduleUnderTest.lastGeneratedId(), //fixme: how to get that?
      },
    });
  });
});
