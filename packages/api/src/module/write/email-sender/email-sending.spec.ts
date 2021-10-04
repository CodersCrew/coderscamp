import { AsyncReturnType } from 'type-fest';

import { SendEmailMessageApplicationCommand } from '@/commands/send-email-message.application-command';
import { EmailMessageWasSent } from '@/events/email-message-was-sent.domain-event';
import { emailSendingTestModule } from '@/write/email-sender/email-sending.test-module';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

describe('Email sending', () => {
  let moduleUnderTest: AsyncReturnType<typeof emailSendingTestModule>;

  beforeEach(async () => {
    moduleUnderTest = await emailSendingTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('when command SendEmailMessage was executed, then email message should be sent', async () => {
    // Given
    const emailMessageId = '577e13dd-20ad-4d95-bdd9-d544c73ce358';
    const emailData = {
      emailMessageId,
      to: 'test@test.com',
      subject: 'Test email',
      text: 'Welcome on board!',
      html: 'Welcome on board! HTML',
    };

    // When
    await moduleUnderTest.executeCommand(() => ({
      class: SendEmailMessageApplicationCommand,
      type: 'SendEmailMessage',
      data: emailData,
    }));

    // Then
    await moduleUnderTest.expectEventsPublishedLastly<EmailMessageWasSent>([
      {
        type: 'EmailMessageWasSent',
        data: { ...emailData, from: 'test-email-address@coderscamp.edu.pl' },
        streamName: EventStreamName.from('EmailMessage', `EmailMessage_${emailMessageId}`),
      },
    ]);

    await moduleUnderTest.expectEmailMessageSentLastly({
      from: 'test-email-address@coderscamp.edu.pl',
      to: 'test@test.com',
      subject: 'Test email',
      text: 'Welcome on board!',
      html: 'Welcome on board! HTML',
    });
  });
});
