import { SendEmailMessage } from '@/module/commands/send-email-message.domain-command';

import { EmailMessageWasSentDomainEvent } from './events';
import { sendEmailMessage } from './sendEmailMessage';

describe('send Email Message', () => {
  it('generated EmailMessageWasSent, on every email message', () => {
    // Given
    const pastEvents: EmailMessageWasSentDomainEvent[] = [];

    // When
    const command: SendEmailMessage = {
      type: 'SendEmailMessage',
      data: {
        emailMessageId: '1',
        to: '2',
        subject: '3',
        text: '4',
        html: '5',
      },
    };
    const appEmailAddress = 'test@test.com';
    const events = sendEmailMessage(pastEvents, command, appEmailAddress);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'EmailMessageWasSent',
        data: {
          emailMessageId: '1',
          to: '2',
          subject: '3',
          text: '4',
          html: '5',
          from: appEmailAddress,
        },
      },
    ]);
  });
});
