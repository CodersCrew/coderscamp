import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';

import { UserModel } from '../../users/user.model';
import { UsersModule } from '../../users/users.module';
import { GithubClient } from './github.client';
import { UsersRepository } from '../../users/users.repository';
import { JwtModule } from '../jwt/jwt.module';
import { JwtService } from '../jwt/jwt.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [UsersRepository, GithubStrategy, GithubService, JwtService],
  controllers: [GithubController],
})
export class GithubModule {}
