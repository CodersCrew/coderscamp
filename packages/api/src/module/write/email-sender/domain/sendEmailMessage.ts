import { SendEmailMessage } from '@/commands/send-email-message.domain-command';

import { EmailMessageWasSentDomainEvent } from './events';

export const sendEmailMessage = (
  _pastEvents: EmailMessageWasSentDomainEvent[],
  command: SendEmailMessage,
  appEmailAddress: string,
): EmailMessageWasSentDomainEvent[] => {
  const { emailMessageId, subject, text, html, to } = command.data;

  return [
    {
      type: 'EmailMessageWasSent',
      data: {
        emailMessageId,
        subject,
        text,
        html,
        to,
        from: appEmailAddress,
      },
    },
  ];
};
