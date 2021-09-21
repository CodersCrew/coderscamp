import { Module } from '@nestjs/common';
import {SharedModule} from "@/write/shared/shared.module";
import {SendEmailMessageCommandHandler} from "@/write/email-sender/application/send-email-message.command-handler";

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [SendEmailMessageCommandHandler]
})
export class EmailSendingWriteModule {}
