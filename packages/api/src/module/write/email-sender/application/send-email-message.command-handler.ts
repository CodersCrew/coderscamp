import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SendEmailMessageApplicationCommand } from '@/commands/send-email-message.application-command';
import { env } from '@/shared/env';
import { EMAIL_SENDER, EmailSender } from '@/write/email-sender/application/email-sender';
import { EmailMessageDomainEvent } from '@/write/email-sender/domain/events';
import { sendEmailMessage } from '@/write/email-sender/domain/sendEmailMessage';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

@CommandHandler(SendEmailMessageApplicationCommand)
export class SendEmailMessageCommandHandler implements ICommandHandler<SendEmailMessageApplicationCommand> {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,

    @Inject(EMAIL_SENDER)
    private readonly emailSender: EmailSender,
  ) {}

  async execute(command: SendEmailMessageApplicationCommand): Promise<void> {
    const appEmailAddress = env.APP_EMAIL_ADDRESS_FROM;
    const { emailMessageId, to, subject, text, html } = command.data;
    const eventStream = EventStreamName.from('EmailMessage', `EmailMessage_${emailMessageId}`);

    await this.emailSender.sendAnEmail({
      from: appEmailAddress,
      to,
      subject,
      text,
      html,
    });

    await this.applicationService.execute<EmailMessageDomainEvent>(
      eventStream,
      { causationId: command.id, correlationId: command.metadata.correlationId },
      (pastEvents) => sendEmailMessage(pastEvents, command, appEmailAddress),
    );
  }
}
