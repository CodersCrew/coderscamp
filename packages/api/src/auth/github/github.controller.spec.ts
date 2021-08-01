/* eslint-disable no-underscore-dangle */
import { Test } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';

import { env } from '@/common/env';

import { JwtService } from '../jwt/jwt.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GithubAuthGuardReq } from './github.types';

const user = {
  id: 1,
  fullName: 'Name',
  githubId: 123,
  email: 'example@test.com',
  image: 'https://photo-url.com',
};

const tokenValue = 'token';
const date = new Date();

const request: GithubAuthGuardReq = httpMocks.createRequest({ user });

describe('Github controller', () => {
  let controller: GithubController;
  let githubService: Partial<GithubService>;
  let jwtService: Partial<JwtService>;

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(date.getTime());
  });

  beforeEach(async () => {
    githubService = {
      authorizeUser: () => Promise.resolve(user),
    };
    jwtService = {
      generateToken: (_user: { id: number }) => tokenValue,
    };

    const module = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [
        { provide: GithubService, useValue: githubService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    controller = await module.resolve(GithubController);
  });

  describe('githubOAuthCallback', () => {
    it('Returns true for successful requests', async () => {
      const response = httpMocks.createResponse();
      const result = await controller.githubOAuthCallback(request, response);

      expect(result).toBe(true);
    });

    it('Sends a success response with token cookie and `true` as a body', async () => {
      const response = httpMocks.createResponse();

      await controller.githubOAuthCallback(request, response);

      expect(response._getStatusCode()).toBe(200);
      expect(response._getJSONData()).toBe(true);
      expect(response.cookies[env.TOKEN_COOKIE_NAME]).toEqual({
        options: { expires: new Date(Date.now() + env.TOKEN_EXPIRATION_TIME * 1000), httpOnly: true },
        value: `${env.TOKEN_PREFIX}${tokenValue}`,
      });
    });
  });
});
