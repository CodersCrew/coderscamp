import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { UserRegistrationCompletedHandler } from './handlers/user-registration-completed.handler';
import { UserProfileController } from './user-profile.controller';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfileService } from './user-profile.service';

const handlers = [UserRegistrationCompletedHandler];
@Module({
  imports: [PrismaModule],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository, ...handlers],
  exports: [UserProfileService, UserProfileRepository],
})
export class UserProfileModule {}
