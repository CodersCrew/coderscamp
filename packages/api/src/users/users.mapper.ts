import type { JwtPayload } from '../auth/jwt/jwt.types';
import type { UserFromJwt } from './users.types';

export class UsersMapper {
  static fromJwtToDomain(payload: JwtPayload): UserFromJwt {
    return {
      id: payload.sub,
    };
  }

  static fromDomainToJwt(user: UserFromJwt): JwtPayload {
    return {
      sub: user.id,
    };
  }
}
