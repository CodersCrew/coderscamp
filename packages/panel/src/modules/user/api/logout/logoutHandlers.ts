import { LOGOUT_ENDPOINT } from '@coderscamp/shared/models/auth/logout';

import { authMock } from '@/mocks/authMock';
import { createHandler } from '@/mocks/utils';

export const logoutRequestHandler = createHandler('post')(LOGOUT_ENDPOINT, (_req, res, ctx) => {
  authMock.logout();

  return res(ctx.status(204));
});
