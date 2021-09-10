import {Inject} from "@nestjs/common";
import {CommandHandler} from "@nestjs/cqrs";

import {SendEmailMessageApplicationCommand} from "@/commands/send-email-message.application-command";
import {APPLICATION_SERVICE, ApplicationService} from "@/write/shared/application/application-service";
import {EventStreamName} from "@/write/shared/application/event-stream-name.value-object";
import {EMAIL_SENDER, EmailSender} from "@/write/email-sender/application/email-sender";

@CommandHandler(SendEmailMessageApplicationCommand)
export class SendEmailMessageCommandHandler {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,

    @Inject(EMAIL_SENDER)
    private readonly emailSender: EmailSender
  ) {}

  async execute(command: SendEmailMessageApplicationCommand): Promise<void> {
    const { emailMessageId, to, subject, text, html } = command.data;
    const eventStream = EventStreamName.from('EmailMessage', `EmailMessage_${emailMessageId}`);

    //TODO
    // 1. send email
    // 2. save event
  }



}
