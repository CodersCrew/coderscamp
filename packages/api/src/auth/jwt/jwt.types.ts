import type { Request } from 'express';

import type { JwtStrategy } from './jwt.strategy';

export interface JwtAuthGuardRequest extends Request {
  user: ReturnType<JwtStrategy['validate']>;
}
