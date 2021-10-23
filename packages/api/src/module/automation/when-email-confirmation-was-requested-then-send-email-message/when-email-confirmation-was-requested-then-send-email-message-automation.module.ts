import { Module } from '@nestjs/common';

import { SharedModule } from '@/write/shared/shared.module';

import { EmailConfirmationWasRequestedEventHandler } from './email-confirmation-was-requested.event-handler.service';

@Module({
  imports: [SharedModule],
  providers: [EmailConfirmationWasRequestedEventHandler],
})
export class WhenEmailConfirmationWasRequestedThenSendEmailMessageAutomationModule {}
