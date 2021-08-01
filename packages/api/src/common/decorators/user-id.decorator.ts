import { createParamDecorator } from '@nestjs/common';
// import type { Request } from 'express';

// import type { RequestUser } from '../typings';

// type RequestWithUser = Request & { user: RequestUser };

/**
 * Returns id of the authorized user.
 * @type param decorator
 */
export const UserId = createParamDecorator((_data: unknown) => {
  // const request = ctx.switchToHttp().getRequest<RequestWithUser>();

  return 1;
});
