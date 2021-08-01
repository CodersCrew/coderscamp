/* eslint-disable no-underscore-dangle */
import { Test } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';

import { env } from '@/common/env';

import { AuthController } from './auth.controller';

describe('Auth controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = await module.resolve(AuthController);
  });

  describe('logout', () => {
    it('Returns true for successful requests', async () => {
      const response = httpMocks.createResponse();
      const result = await controller.logout(response);

      expect(result).toBe(true);
    });

    it('Clears the cookie containing authorization JWT and sends true as a response', async () => {
      const response = httpMocks.createResponse();

      response.cookie(env.TOKEN_COOKIE_NAME, 'some token value');

      await controller.logout(response);

      const removedCookie = response.cookies[env.TOKEN_COOKIE_NAME];

      expect(removedCookie.value).toBe('');
      expect(removedCookie.options.expires?.getTime()).toBe(new Date(1).getTime());
      expect(response._getStatusCode()).toBe(200);
    });
  });
});
