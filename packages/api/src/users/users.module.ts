import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserRegisterHandler } from './events';
import { UserModel } from './user.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

export const CommandHandlers = [];
export const EventHandlers = [UserRegisterHandler];
@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [UsersRepository, UserModel, ...CommandHandlers, ...EventHandlers],
  exports: [UserModel],
})
export class UsersModule {}
