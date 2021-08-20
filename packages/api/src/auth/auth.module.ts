import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
