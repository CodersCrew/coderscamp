import { REGISTER_ENDPOINT, RegisterBody } from '@coderscamp/shared/models/auth/register';

import { createHandler } from '@/mocks/utils';
import { validationMock } from '@/mocks/validationMock';

import { loginCorrectData } from '../login/loginHandlers';

export const registerCorrectData: RegisterBody = {
  fullName: 'Jane Doe',
  ...loginCorrectData,
};

export const registerRequestHandler = createHandler('post')<RegisterBody>(REGISTER_ENDPOINT, async (req, res, ctx) => {
  try {
    await validationMock(RegisterBody, req.body);

    return res(ctx.status(204));
  } catch {
    return res(ctx.status(500));
  }
});
