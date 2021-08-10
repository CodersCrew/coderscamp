import type { Request } from 'express';

import type { RegisteredUser } from '@coderscamp/shared/models';

import type { GithubStrategy } from './github.strategy';

export interface GithubUser {
  id: number;
  name: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  avatar_url: string;
}

export interface GithubAuthGuardReq extends Request {
  user: ReturnType<GithubStrategy['validate']>;
}

export type NotRegisteredUser = Omit<RegisteredUser, 'id'>;
