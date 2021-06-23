import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/shared/config.service';
import { SharedModule } from 'src/shared/shared.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubClient } from './strategies/github.client';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return config.jwtConfig;
      },
    }),
    UsersModule,
    SharedModule,
  ],
  providers: [ConfigService, GithubClient, AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
