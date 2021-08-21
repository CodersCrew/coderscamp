import { Module } from '@nestjs/common';

import { UserRegistrationCompletedHandler } from './handlers/user-registration-completed.handler';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const handlers = [UserRegistrationCompletedHandler];
@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ...handlers],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
