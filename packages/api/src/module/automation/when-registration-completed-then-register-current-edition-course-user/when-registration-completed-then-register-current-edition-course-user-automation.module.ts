import { Module } from '@nestjs/common';

import { SharedModule } from '@/write/shared/shared.module';

import { UserRegistrationWasCompletedEventHandler } from './user-registration-was-completed.event-handler.service';

@Module({
  imports: [SharedModule],
  providers: [UserRegistrationWasCompletedEventHandler],
})
export class WhenRegistrationCompletedThenRegisterCurrentUserAutomationModule {}
