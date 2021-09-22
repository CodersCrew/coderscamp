import { GET_ME_ENDPOINT, GetMeResponse } from '@coderscamp/shared/models/user/getMe';
import { omit } from '@coderscamp/shared/utils/object';

import { authMock } from '@/mocks/authMock';
import { createHandler } from '@/mocks/utils';

import { registerCorrectData } from '../register/registerHandlers';

export const getMeSuccessResponseMock: GetMeResponse = {
  id: '6c0a6fad-9ef7-4936-98d9-48b9e2f24853',
  image: 'https://randomuser.me/api/portraits/women/82.jpg',
  ...omit(registerCorrectData, ['password']),
};

export const getMeRequestHandler = createHandler('get')(GET_ME_ENDPOINT, (_req, res, ctx) => {
  if (authMock.getIsAuthenticated()) {
    return res(ctx.status(200), ctx.json(getMeSuccessResponseMock));
  }

  return res(ctx.status(401, 'Unauthorized'));
});
