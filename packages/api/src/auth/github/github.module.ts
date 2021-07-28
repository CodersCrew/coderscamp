import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

import { UsersEntity } from '../../users/users.entity';
import { UsersModule } from '../../users/users.module';
import { JWTModule } from '../jwtStrategy/jwt.module';
import { JwtStrategy } from '../jwtStrategy/jwt.strategy';
import { GithubClient } from './github.client';
import { GithubController } from './github.controller';

@Module({
  imports: [UsersModule, JWTModule],
  providers: [JwtStrategy, UsersRepository, UsersEntity, GithubClient],
  controllers: [GithubController],
})
export class GithubModule {}
