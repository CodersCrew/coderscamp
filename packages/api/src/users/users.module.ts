import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
