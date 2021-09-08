import { SendEmailMessage } from '@/module/commands/send-email-message.domain-command';

import { EmailMessageWasSentDomainEvent } from './events';
import { sendEmailMessage } from './sendEmailMessage';

const userData = {
  emailMessageId: '1',
  to: 'user1@coderscrew.pl',
  subject: 'coderscamp',
  text: 'description',
  html: 'html',
};
const appEmailAddress = 'test@test.com';

describe('send Email Message', () => {
  it('generated EmailMessageWasSent, on every email message', () => {
    // Given
    const pastEvents: EmailMessageWasSentDomainEvent[] = [];

    // When
    const command: SendEmailMessage = {
      type: 'SendEmailMessage',
      data: userData,
    };

    const events = sendEmailMessage(pastEvents, command, appEmailAddress);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'EmailMessageWasSent',
        data: { ...userData, from: appEmailAddress },
      },
    ]);
  });
});
