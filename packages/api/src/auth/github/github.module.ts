import { Module } from '@nestjs/common';

import { UserModel } from '../../users/user.model';
import { JwtModule } from '../jwt/jwt.module';
import { JwtService } from '../jwt/jwt.service';
import { GithubController } from './github.controller';
import { GithubRepository } from './github.repository';
import { GithubService } from './github.service';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [JwtModule],
  providers: [GithubRepository, UserModel, GithubStrategy, GithubService, JwtService],
  controllers: [GithubController],
})
export class GithubModule {}
