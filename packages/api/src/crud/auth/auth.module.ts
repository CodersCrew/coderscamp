import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { env } from '@/shared/env';
import { SharedModule } from '@/write/shared/shared.module';

import { AuthController } from './auth.controller';
import { AuthUserRepository } from './auth-user.repository';
import { UserRegistrationStartedHandler } from './automation/user-registration-started.handler';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';

const handlers = [UserRegistrationStartedHandler];
const strategies = [JwtStrategy, LocalStrategy];

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.TOKEN_EXPIRATION_TIME },
    }),
    PassportModule,
    CqrsModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthUserRepository, ...handlers, ...strategies],
})
export class AuthModule {}
