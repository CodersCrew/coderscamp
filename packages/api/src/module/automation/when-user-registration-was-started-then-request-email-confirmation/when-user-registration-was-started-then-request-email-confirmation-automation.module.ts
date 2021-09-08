import { Module } from '@nestjs/common';

import { SharedModule } from '@/write/shared/shared.module';

import { UserRegistrationWasStartedEventHandler } from './user-registration-was-started.event-handler';

@Module({
  imports: [SharedModule],
  providers: [UserRegistrationWasStartedEventHandler],
})
export class WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule {}
