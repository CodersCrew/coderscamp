/* eslint-disable no-underscore-dangle */
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../shared/env';

import { AuthController } from './auth.controller';
import type { LocalGuardRequest } from './local/local.types';
import { UserRegistrationService } from './user-registration.service';

describe('Auth controller', () => {
  let controller: AuthController;
  let authService: Partial<UserRegistrationService>;
  let jwtService: Partial<JwtService>;

  const mockedJwt = 'some token value';

  beforeEach(async () => {
    authService = {
      register: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue(mockedJwt),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: UserRegistrationService, useValue: authService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    controller = await module.resolve(AuthController);
  });

  describe('register', () => {
    it('calls `authService` with received body', async () => {
      const bodyMock = { fullName: 'Some Name', email: 'some@mail.com', password: 'xyz' };

      await controller.register(bodyMock);

      expect(authService.register).toHaveBeenCalledWith(bodyMock);
      expect(authService.register).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    it('sends 204 code as a successful response', async () => {
      const response = httpMocks.createResponse();
      const request = { user: { id: uuidv4() } } as LocalGuardRequest;

      await controller.login(request, response);

      expect(response._getStatusCode()).toBe(204);
    });

    it('adds JWT token cookie to the response', async () => {
      const response = httpMocks.createResponse();
      const request = { user: { id: uuidv4() } } as LocalGuardRequest;

      await controller.login(request, response);

      const addedCookie = response.cookies[env.TOKEN_COOKIE_NAME];

      expect(addedCookie.value).toBe(`${env.TOKEN_PREFIX}${mockedJwt}`);
    });
  });

  describe('logout', () => {
    it('returns void for a successful request', async () => {
      const response = httpMocks.createResponse();
      const result = await controller.logout(response);

      expect(result).toBeUndefined();
    });

    it('sends 204 code as a successful response', async () => {
      const response = httpMocks.createResponse();

      await controller.logout(response);

      expect(response._getStatusCode()).toBe(204);
    });

    it('clears the cookie containing authorization JWT', async () => {
      const response = httpMocks.createResponse();

      response.cookie(env.TOKEN_COOKIE_NAME, 'some token value');

      await controller.logout(response);

      const removedCookie = response.cookies[env.TOKEN_COOKIE_NAME];

      expect(removedCookie.value).toBe('');
      expect(removedCookie.options.expires?.getTime()).toBe(new Date(1).getTime());
    });
  });
});
