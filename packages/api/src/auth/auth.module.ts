import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { GithubModule } from './githubClient/github.module';
import { JWTModule } from './jwtStrategy/jwt.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JWTModule, GithubModule],
})
export class AuthModule {}
