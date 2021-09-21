import { Module } from '@nestjs/common';
import {SharedModule} from "@/write/shared/shared.module";
import {SendEmailMessageApplicationCommand} from "@/commands/send-email-message.application-command";

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [SendEmailMessageApplicationCommand]
})
export class EmailSendingWriteModule {}
