import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { UsersRepository } from '../../users/users.repository';
import { JWTModule } from '../jwt/jwt.module';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { GithubController } from './github.controller';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [UsersModule, JWTModule],
  providers: [JwtStrategy, UsersRepository, GithubStrategy],
  controllers: [GithubController],
})
export class GithubModule {}
