import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersEntity],
  exports: [UsersEntity, UsersRepository],
})
export class UsersModule {}
