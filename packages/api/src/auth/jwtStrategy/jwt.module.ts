import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<number>('TOKEN_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule],
})
export class JWTModule {}
