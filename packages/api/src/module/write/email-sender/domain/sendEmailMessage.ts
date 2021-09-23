import { SendEmailMessage } from '@/commands/send-email-message.domain-command';
import { EmailMessageWasSentDomainEvent } from '@/write/email-sender/domain/events';

export function sendEmailMessage(
  _pastEvents: EmailMessageWasSentDomainEvent[],
  command: SendEmailMessage,
  appEmailAddress: string,
): EmailMessageWasSentDomainEvent[] {
  const { emailMessageId, to, subject, text, html } = command.data;

  return [
    {
      type: 'EmailMessageWasSent',
      data: {
        emailMessageId,
        from: appEmailAddress,
        to,
        subject,
        text,
        html,
      },
    },
  ];
}
