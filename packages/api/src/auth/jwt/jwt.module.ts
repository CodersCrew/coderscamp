import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { env } from '@/common/env';

import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.TOKEN_EXPIRATION_TIME },
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [NestJwtModule, JwtService],
})
export class JwtModule {}
