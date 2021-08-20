import type { GithubUser } from '../auth/github/github.types';
import type { JwtPayload } from '../auth/jwt/jwt.types';
import type { UserFromGithub, UserFromJwt } from './users.types';

export class UsersMapper {
  static fromGithubToDomain(user: GithubUser): UserFromGithub {
    return {
      fullName: user.name,
      email: user.email,
      image: user.avatar_url,
      githubId: user.id,
    };
  }

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
