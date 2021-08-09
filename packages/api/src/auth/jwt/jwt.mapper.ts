import { JwtPayload, UserFromJwt } from './jwt.types';

export class JwtMapper {
  static fromDomainToJwt(user: UserFromJwt): JwtPayload {
    return {
      sub: String(user.id),
    };
  }

  static fromJwtToDomain(payload: JwtPayload): UserFromJwt {
    return {
      id: Number(payload.sub),
    };
  }
}
