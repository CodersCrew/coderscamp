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
    it('Returns void for a successful request', async () => {
      const response = httpMocks.createResponse();
      const result = await controller.logout(response);

      expect(result).toBeUndefined();
    });

    it('Sends 204 code as a successful response', async () => {
      const response = httpMocks.createResponse();

      await controller.logout(response);

      expect(response._getStatusCode()).toBe(204);
    });

    it('Clears the cookie containing authorization JWT', async () => {
      const response = httpMocks.createResponse();

      response.cookie(env.TOKEN_COOKIE_NAME, 'some token value');

      await controller.logout(response);

      const removedCookie = response.cookies[env.TOKEN_COOKIE_NAME];

      expect(removedCookie.value).toBe('');
      expect(removedCookie.options.expires?.getTime()).toBe(new Date(1).getTime());
    });
  });
});
