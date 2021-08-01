import type { User } from '@coderscamp/shared/models/user';

export interface JWTPayload {
  sub: string;
}

export type RequestUser = Pick<User, 'id'>;
