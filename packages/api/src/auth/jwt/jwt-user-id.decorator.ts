import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { JwtAuthGuardReq } from './jwt.types';

/**
 * Returns id of the authorized user.
 * @type param decorator
 */
export const JwtUserId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<JwtAuthGuardReq>();

  return request.user.id;
});
