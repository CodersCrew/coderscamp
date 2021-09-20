import { Module } from '@nestjs/common';

import { SharedModule } from '@/write/shared/shared.module';

import { EmailConfirmationWasApprovedEventHandler } from './email-confirmation-was-approved-event-handler.service';

@Module({
  imports: [SharedModule],
  providers: [EmailConfirmationWasApprovedEventHandler],
})
export class WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule {}
