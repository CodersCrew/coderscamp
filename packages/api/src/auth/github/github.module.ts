import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';

import { UserModel } from '../../users/user.model';
import { UsersModule } from '../../users/users.module';
import { JWTModule } from '../jwtStrategy/jwt.module';
import { JwtStrategy } from '../jwtStrategy/jwt.strategy';
import { GithubClient } from './github.client';
import { GithubController } from './github.controller';

@Module({
  imports: [UsersModule, JWTModule],
  providers: [UsersRepository, UsersService, JwtStrategy, UserModel, GithubClient],
  controllers: [GithubController],
})
export class GithubModule {}
