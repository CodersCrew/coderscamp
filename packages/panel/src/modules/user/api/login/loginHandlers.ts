import { LOGIN_ENDPOINT, LoginBody } from '@coderscamp/shared/models/auth/login';

import { authMock } from '@/mocks/authMock';
import { createHandler } from '@/mocks/utils';
import { validationMock } from '@/mocks/validationMock';

export const loginCorrectData: LoginBody = {
  email: 'jane@doe.test',
  password: 'password123',
};

export const loginRequestHandler = createHandler('post')<LoginBody>(LOGIN_ENDPOINT, async (req, res, ctx) => {
  try {
    const { email, password } = await validationMock(LoginBody, req.body);

    if (email === loginCorrectData.email && password === loginCorrectData.password) {
      authMock.login();

      return res(ctx.status(204));
    }

    return res(ctx.status(401, 'Unauthorized'));
  } catch (ex) {
    return res(ctx.status(500));
  }
});
