import { SendEmailMessage } from '@/commands/send-email-message.domain-command';
import { EmailMessageWasSentDomainEvent } from '@/write/email-sender/domain/events';
import { sendEmailMessage } from '@/write/email-sender/domain/sendEmailMessage';

describe('sending email message', () => {
  it('create event EmailMessageWasSent when SendEmailMessage is invoked after EmailConfirmationWasRequested', () => {
    // Given
    const pastEvents: EmailMessageWasSentDomainEvent[] = [];

    const emailData = {
      emailMessageId: '577e13dd-20ad-4d95-bdd9-d544c73ce358',
      to: 'test@test.com',
      subject: 'Test email',
      text: 'Welcome on board!',
      html: 'Welcome on board! HTML',
    };
    const appEmail = 'coderscamp@gmail.com';

    // When
    const command: SendEmailMessage = {
      type: 'SendEmailMessage',
      data: emailData,
    };
    const events = sendEmailMessage(pastEvents, command, appEmail);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'EmailMessageWasSent',
        data: { ...emailData, from: appEmail },
      },
    ]);
  });
});
