import { AsyncReturnType } from 'type-fest';

import {
  RequestEmailConfirmationApplicationCommand,
  requestEmailConfirmationCommand,
} from '@/module/commands/request-email-conformation';
import {
  EmailConfirmationWasRequested,
  emailConfirmationWasRequestedEvent,
} from '@/module/events/email-confirmation-was-requested.domain-event';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { emailConfirmationTestModule } from './email-confirmation.test-module';

describe('Email confirmation', () => {
  let moduleUnderTest: AsyncReturnType<typeof emailConfirmationTestModule>;

  beforeEach(async () => {
    moduleUnderTest = await emailConfirmationTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('creates EmailConfirmationWasRequested event when RequestEmailConfirmation has been executed', async () => {
    // Given
    const exampleUserId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const exampleConfirmationToken = 'sbAPITNMsl2wW6j2cg1H2A';
    const exampleConfirmationFor = 'user-registration';

    // When
    await moduleUnderTest.executeCommand(() => ({
      class: RequestEmailConfirmationApplicationCommand,
      ...requestEmailConfirmationCommand({
        userId: exampleUserId,
        confirmationToken: exampleConfirmationToken,
        confirmationFor: exampleConfirmationFor,
      }),
    }));

    // Then
    await moduleUnderTest.expectEventPublishedLastly<EmailConfirmationWasRequested>({
      ...emailConfirmationWasRequestedEvent({
        userId: exampleUserId,
        confirmationToken: exampleConfirmationToken,
        confirmationFor: exampleConfirmationFor,
      }),
      streamName: EventStreamName.from('EmailConfirmation', `${exampleUserId}_${exampleConfirmationFor}`),
    });
  });
});
