import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AuthController } from '../src/auth/auth.controller';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { GithubClient } from '../src/auth/strategies/github.client';
import { PrismaModule } from '../src/prisma/prisma.module';
import { ConfigService } from '../src/shared/config.service';
import { SharedModule } from '../src/shared/shared.module';
import { UsersService } from '../src/users/users.service';

describe('AuthController', () => {
  let app: INestApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        SharedModule,
        JwtModule.registerAsync({
          imports: [SharedModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => {
            return config.jwtConfig;
          },
        }),
        PrismaModule,
        AuthModule,
      ],
      controllers: [AuthController],
      providers: [ConfigService, UsersService, AuthService, GithubClient],
    }).compile();

    app = module.createNestApplication();
    configService = module.get<ConfigService>('ConfigService');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('auth/github/login', () => {
    it('Should redirect user to github login page.', async () => {
      const test = supertest(app.getHttpServer());
      const response = await test.get('/auth/github/login');

      expect(response.headers.location).toEqual(
        `https://github.com/login/oauth/authorize?response_type=code&scope=read%3Auser&client_id=${configService.githubClientConfig.clientID}`,
      );
      expect(response.statusCode).toEqual(HttpStatus.FOUND);
    });
  });
});
