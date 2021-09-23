import { Module } from '@nestjs/common';

import { SendEmailMessageCommandHandler } from '@/write/email-sender/application/send-email-message.command-handler';
import { SharedModule } from '@/write/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [SendEmailMessageCommandHandler],
})
export class EmailSendingWriteModule {}
