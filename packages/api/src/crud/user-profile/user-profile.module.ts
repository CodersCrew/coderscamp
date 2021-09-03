import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { CreateUserProfileWhenRegistrationCompletedAutomation } from './automation/create-user-profile-when-registration-completed.automation';
import { UserProfileController } from './user-profile.controller';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfileService } from './user-profile.service';

const handlers = [CreateUserProfileWhenRegistrationCompletedAutomation];
@Module({
  imports: [PrismaModule],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository, ...handlers],
  exports: [UserProfileService, UserProfileRepository],
})
export class UserProfileModule {}
