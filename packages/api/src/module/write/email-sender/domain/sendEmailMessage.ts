import { SendEmailMessage } from '@/commands/send-email-message.domain-command';
import { EmailMessageDomainEvent } from '@/write/email-sender/domain/events';

export function sendEmailMessage(
  _pastEvents: EmailMessageDomainEvent[],
  command: SendEmailMessage,
  appEmailAddress: string,
): EmailMessageDomainEvent[] {
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
