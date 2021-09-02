import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserRegistrationController } from '@/crud/user-registration/user-registration.controller';
import { UserRegistrationRepository } from '@/crud/user-registration/user-registration.repository';
import { UserRegistrationService } from '@/crud/user-registration/user-registration.service';
import {SharedModule} from "@/write/shared/shared.module";

@Module({
  imports: [SharedModule],
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService, UserRegistrationRepository],
})
export class UserRegistrationModule {}
