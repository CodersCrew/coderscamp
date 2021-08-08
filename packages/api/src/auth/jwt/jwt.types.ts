import type { JwtStrategy } from './jwt.strategy';

export interface JwtPayload {
  sub: string;
}

export interface JwtAuthGuardReq extends Request {
  user: ReturnType<JwtStrategy['validate']>;
}
