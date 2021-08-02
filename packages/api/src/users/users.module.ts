import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserModel } from './user.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [UsersRepository, UserModel, UsersService],
  exports: [UserModel],
})
export class UsersModule {}
