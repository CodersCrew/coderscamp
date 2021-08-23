import { Module } from '@nestjs/common';

import { UserRegistrationCompletedHandler } from './handlers/user-registration-completed.handler';
import { WhatIsUserNameHandler } from './handlers/what-is-user-name.handler';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const handlers = [UserRegistrationCompletedHandler, WhatIsUserNameHandler];
@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ...handlers],
})
export class UsersModule {}
