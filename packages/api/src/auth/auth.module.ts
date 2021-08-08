import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { GithubModule } from './github/github.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [PassportModule, JwtModule, GithubModule],
  controllers: [AuthController],
})
export class AuthModule {}
