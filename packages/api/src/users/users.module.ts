import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RegisterUserHandler, UpdateUserHandler } from './commands';
import { UserRegisterHandler } from './events';
import { FindUserWithGivenGithubIdQueryHandler, FindUserWithGivenIdQueryHandler } from './queries';
import { UserModel } from './user.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

export const CommandHandlers = [UpdateUserHandler, RegisterUserHandler];
export const EventHandlers = [UserRegisterHandler];
export const QueriesHandlers = [FindUserWithGivenGithubIdQueryHandler, FindUserWithGivenIdQueryHandler];
@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [UsersRepository, UserModel, ...CommandHandlers, ...EventHandlers, ...QueriesHandlers],
  exports: [UserModel],
})
export class UsersModule {}
