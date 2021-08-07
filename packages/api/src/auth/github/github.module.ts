import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
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
