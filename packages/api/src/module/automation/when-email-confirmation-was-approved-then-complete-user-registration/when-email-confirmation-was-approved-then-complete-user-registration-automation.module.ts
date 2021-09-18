import { Module } from '@nestjs/common';

import { SharedModule } from '@/write/shared/shared.module';

import { EmailConfirmationWasApprovedEventHandlerService } from './email-confirmation-was-approved-event-handler.service';

@Module({
  imports: [SharedModule],
  providers: [EmailConfirmationWasApprovedEventHandlerService],
})
export class WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule {}
