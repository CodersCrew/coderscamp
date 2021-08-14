import { JwtPayload, UserFromJwt } from './jwt.types';

export class JwtMapper {
  static fromDomainToJwt(user: UserFromJwt): JwtPayload {
    return {
      sub: user.id,
    };
  }

  static fromJwtToDomain(payload: JwtPayload): UserFromJwt {
    return {
      id: payload.sub,
    };
  }
}
