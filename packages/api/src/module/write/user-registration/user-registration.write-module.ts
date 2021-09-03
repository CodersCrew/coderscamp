import { Module } from '@nestjs/common';

import { SharedModule } from '@/write/shared/shared.module';
import { RegisterUserCommandHandler } from '@/write/user-registration/application/register-user.command-handler';
import { UserRegistrationEmails } from '@/write/user-registration/application/user-registration-emails.service';
import { UserRegistrationRestController } from '@/write/user-registration/presentation/rest/user-registration.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [UserRegistrationRestController],
  providers: [RegisterUserCommandHandler, UserRegistrationEmails],
})
export class UserRegistrationWriteModule {}
