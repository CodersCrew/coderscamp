import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RegisterHandler } from './events';
import { UserFactory } from './user.factory';
import { UserModel } from './user.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

export const CommandHandlers = [];
export const EventHandlers = [RegisterHandler];
@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [UserFactory, UsersRepository, UserModel, UsersService, ...CommandHandlers, ...EventHandlers],
  exports: [UserModel],
})
export class UsersModule {}
