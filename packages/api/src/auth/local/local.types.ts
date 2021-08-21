import type { Request } from 'express';
import type { AsyncReturnType } from 'type-fest';

import type { LocalStrategy } from './local.strategy';

export interface LocalGuardRequest extends Request {
  user: AsyncReturnType<LocalStrategy['validate']>;
}
