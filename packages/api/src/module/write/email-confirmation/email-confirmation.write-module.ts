import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { RequestEmailConfirmationApplicationCommandHandler } from './application/request-email-confirmation-application-command-handler';
import { EmailConfirmationRestController } from './presentation/rest/email-confirmation.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [EmailConfirmationRestController],
  providers: [RequestEmailConfirmationApplicationCommandHandler],
})
export class EmailConfirmationWriteModule {}
