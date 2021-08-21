import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { env } from '@/common/env';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUserRepository } from './auth-user.repository';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { UserRegistrationRepository } from './user-registration.repository';

const events = [UserRegistrationCompletedEvent];
const strategies = [JwtStrategy, LocalStrategy];

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.TOKEN_EXPIRATION_TIME },
    }),
    PassportModule,
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRegistrationRepository, AuthUserRepository, ...events, ...strategies],
})
export class AuthModule {}
