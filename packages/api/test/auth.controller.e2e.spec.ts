import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AuthModule } from '../src/auth/auth.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';

describe('AuthController', () => {
  let app: INestApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule, PrismaModule, AuthModule, UsersModule],
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
        `https://github.com/login/oauth/authorize?response_type=code&scope=read%3Auser&client_id=${configService.get(
          'GITHUB_CLIENT_ID',
        )}`,
      );
      expect(response.statusCode).toEqual(HttpStatus.FOUND);
    });
  });
});
