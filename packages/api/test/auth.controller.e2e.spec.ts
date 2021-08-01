import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { env } from 'process';
import supertest from 'supertest';

import { AuthModule } from '../src/auth/auth.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';

describe('AuthController', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;

  describe('auth/github/login', () => {
    it('Should redirect user to github login page.', async () => {
      const response = await request.get('/auth/github/login');

      expect(response.headers.location).toEqual(
        `https://github.com/login/oauth/authorize?response_type=code&scope=read%3Auser&client_id=${env.GITHUB_CLIENT_ID}`,
      );
      expect(response.statusCode).toEqual(HttpStatus.FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [PrismaModule, AuthModule, UsersModule],
    }).compile();

    app = module.createNestApplication();
    request = supertest(app.getHttpServer());
    await app.init();
  }

  beforeEach(async () => {
    await setup();
  });
});
