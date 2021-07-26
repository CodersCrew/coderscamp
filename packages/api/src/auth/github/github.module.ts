import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { UsersRepository } from '../../users/users.repository';
import { JWTModule } from '../jwtStrategy/jwt.module';
import { JwtStrategy } from '../jwtStrategy/jwt.strategy';
import { GithubClient } from './github.client';
import { GithubController } from './github.controller';

@Module({
  imports: [UsersModule, JWTModule],
  providers: [JwtStrategy, UsersRepository, GithubClient],
  controllers: [GithubController],
})
export class GithubModule {}
