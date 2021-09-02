import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { UserRegistrationCompletedHandler } from './handlers/user-registration-completed.handler';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const handlers = [UserRegistrationCompletedHandler];
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ...handlers],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
