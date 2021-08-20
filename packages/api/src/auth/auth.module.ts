import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { JwtModule } from './jwt/jwt.module';

const events = [UserRegistrationCompletedEvent];

@Module({
  imports: [PassportModule, JwtModule, CqrsModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ...events],
})
export class AuthModule {}
