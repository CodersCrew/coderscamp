import {EmailMessageWasSentDomainEvent} from "@/write/email-sender/domain/events";
import {SendEmailMessage} from "@/commands/send-email-message.domain-command";
import {env} from "@/shared/env";

export function sendEmailMessage(
  _pastEvents: EmailMessageWasSentDomainEvent[],
  command: SendEmailMessage,
  appEmailAddress: env.APP_EMAIL_ADDRESS
): EmailMessageWasSentDomainEvent[] {
  const {emailMessageId, to, subject, text, html} = command.data;

  return [
    {
      type: 'EmailMessageWasSent',
      data: {
        emailMessageId,
        from: appEmailAddress,
        to,
        subject,
        text,
        html
      }
    }
  ]
}
