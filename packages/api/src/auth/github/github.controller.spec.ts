/* eslint-disable no-underscore-dangle */
import { Test } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';

import { env } from '@/common/env';

import type { RegisteredUserDTO } from '../../../../shared/src/models/user';
import { UserRepository } from '../../contracts/user.repository';
import { MemoryDbService } from '../../memoryDB/memoryDB.service';
import { PgMemUserRepositoryAdapter } from '../../memoryDB/user.repository';
import { UsersRepository } from '../../users/users.repository';
import { UsersService } from '../../users/users.service';
import { JwtService } from '../jwt/jwt.service';
import { GithubClient } from './github.client';
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
    it('Returns void for a successful request', async () => {
      const response = httpMocks.createResponse();
      const result = await controller.githubOAuthCallback(request, response);

      expect(result).toBeUndefined();
    });

    it('Sends 204 code as a successful response', async () => {
      const response = httpMocks.createResponse();

      await controller.githubOAuthCallback(request, response);

      expect(response._getStatusCode()).toBe(204);
    });

    it('Attaches token cookie to a successful response', async () => {
      const response = httpMocks.createResponse();

      await controller.githubOAuthCallback(request, response);

      expect(response.cookies[env.TOKEN_COOKIE_NAME]).toEqual({
        options: { expires: new Date(Date.now() + env.TOKEN_EXPIRATION_TIME * 1000), httpOnly: true },
        value: `${env.TOKEN_PREFIX}${tokenValue}`,
      });
    });
  });
});
