import type { UserId } from '../../users/users.types';

export interface JwtPayload {
  sub: string;
}

export interface JwtUser {
  id: UserId;
}

export const fromJwtToUser = (payload: JwtPayload): JwtUser => ({
  id: payload.sub,
});

export const fromUserToJwt = (user: JwtUser): JwtPayload => ({
  sub: user.id,
});
