import type { RegisteredUser } from '@coderscamp/shared/models';

import type { JwtStrategy } from './jwt.strategy';

export interface JwtPayload {
  sub: string;
}

export interface JwtAuthGuardReq extends Request {
  user: ReturnType<JwtStrategy['validate']>;
}

export type UserFromJwt = Pick<RegisteredUser, 'id'>;
