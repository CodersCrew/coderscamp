import { AsyncReturnType } from 'type-fest';

import { completeUserRegistrationCommand } from '@/module/commands/complete-user-registration';
import { emailConfirmationWasApprovedEvent } from '@/module/events/email-confirmation-was-approved.domain.event';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModuleAutomationTestModule as WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationTestModule } from './when-email-confirmation-was-approved-then-complete-user-registration.test-module';

describe('CompleteUser registration when emailConfirmationWasApproved', () => {
  let moduleUnderTest: AsyncReturnType<
    typeof WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationTestModule
  >;

  beforeEach(async () => {
    moduleUnderTest = await WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('CompleteUser registration when emailConfirmationWasApproved', async () => {
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationFor = 'user-registration';
    const event = emailConfirmationWasApprovedEvent({ userId, confirmationFor });

    await moduleUnderTest.eventOccurred(
      EventStreamName.from('EmailConfirmation', `${userId}_${confirmationFor}`),
      event,
    );

    await moduleUnderTest.expectCommandExecutedLastly(completeUserRegistrationCommand({ userId }));
  });
});
