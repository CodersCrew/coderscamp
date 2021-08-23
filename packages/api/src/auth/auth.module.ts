import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { env } from '@/common/env';

import { AuthController } from './auth.controller';
import { AuthUserRepository } from './auth-user.repository';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { UserRegistrationStartedEvent } from './events/user-registration-started.event';
import { UserRegistrationStartedHandler } from './handlers/user-registration-started.handler';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { UserRegistrationRepository } from './user-registration.repository';
import { UserRegistrationService } from './user-registration.service';

const events = [UserRegistrationCompletedEvent, UserRegistrationStartedEvent];
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
  ],
  controllers: [AuthController],
  providers: [
    UserRegistrationService,
    UserRegistrationRepository,
    AuthUserRepository,
    ...events,
    ...handlers,
    ...strategies,
  ],
})
export class AuthModule {}
