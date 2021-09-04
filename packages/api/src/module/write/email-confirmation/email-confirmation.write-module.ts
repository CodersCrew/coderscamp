import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { RequestEmailConfirmationApplicationCommandHandler } from './application/request-email-confirmation-application-command-handler';

@Module({
  imports: [SharedModule],
  providers: [RequestEmailConfirmationApplicationCommandHandler],
})
export class EmailConfirmationWriteModule {}
