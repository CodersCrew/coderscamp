import { Role } from '@prisma/client';

import type { UserId } from '@/crud/users/users.types';

export interface JwtPayload {
  sub: string;
  role: Role;
}

export interface JwtUser {
  id: UserId;
  role: Role;
}

export const fromJwtToUser = (payload: JwtPayload): JwtUser => ({
  id: payload.sub,
  role: payload.role,
});

export const fromUserToJwt = (user: JwtUser): JwtPayload => ({
  sub: user.id,
  role: user.role,
});
