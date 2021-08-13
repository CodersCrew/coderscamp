import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserModel } from '../../users/user.model';
import { JwtModule } from '../jwt/jwt.module';
import { JwtService } from '../jwt/jwt.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [CqrsModule, JwtModule],
  providers: [UserModel, GithubStrategy, GithubService, JwtService],
  controllers: [GithubController],
})
export class GithubModule {}
