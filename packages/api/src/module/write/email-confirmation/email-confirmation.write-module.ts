import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { ApproveEmailConfirmationApplicationCommandHandler } from './application/approve-email-confirmation-application-command-handler';
import { RequestEmailConfirmationApplicationCommandHandler } from './application/request-email-confirmation-application-command-handler';

@Module({
  imports: [SharedModule],
  providers: [RequestEmailConfirmationApplicationCommandHandler, ApproveEmailConfirmationApplicationCommandHandler],
})
export class EmailConfirmationWriteModule {}
