import { AsyncReturnType } from 'type-fest';

import { emailConfirmationWasRequestedEvent } from '@/module/events/email-confirmation-was-requested.domain-event';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { whenEmailConfirmationWasRequestedThenSendEmailMessageAutomationTestModule } from './when-email-confirmation-was-requested-then-send-email-message.test-module';

describe('SendEmailMessage when emailConfirmationWasRequested', () => {
  let moduleUnderTest: AsyncReturnType<
    typeof whenEmailConfirmationWasRequestedThenSendEmailMessageAutomationTestModule
  >;

  beforeEach(async () => {
    moduleUnderTest = await whenEmailConfirmationWasRequestedThenSendEmailMessageAutomationTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it("does nothing if confirmation is not for 'user-registration'", async () => {
    // Given
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationFor = 'reset-password';
    const confirmationToken = '41c2c1fc8f6cdc15.d5ee8246071726582172f83d569287951a0d727c94dfc35e291fe17abec789c2';
    const event = emailConfirmationWasRequestedEvent({ userId, confirmationFor, confirmationToken });

    // When
    await moduleUnderTest.eventOccurred(
      EventStreamName.from('EmailConfirmation', `${userId}_${confirmationFor}`),
      event,
    );

    // then
    await moduleUnderTest.expectCommandWasNotAppeared();
  });

  it("creates command SendEmailMessage for confirmation  'user-registration'", async () => {
    // Given
    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const confirmationFor = 'user-registration';
    const confirmationToken = '41c2c1fc8f6cdc15.d5ee8246071726582172f83d569287951a0d727c94dfc35e291fe17abec789c2';
    const event = emailConfirmationWasRequestedEvent({ userId, confirmationFor, confirmationToken });

    // When
    await moduleUnderTest.eventOccurred(
      EventStreamName.from('EmailConfirmation', `${userId}_${confirmationFor}`),
      event,
    );

    // then
    await moduleUnderTest.expectCommandExecutedLastly({
      type: 'SendEmailMessage',
      data: {
        emailMessageId: '12345',
        subject: 'Confirm your account',
      },
    });
  });
});
