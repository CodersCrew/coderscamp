import type {
  RegisteredUser,
  RegisteredUserDTO,
  UserInformation,
  UserInformationDTO,
  UserSurvey,
  UserSurveyDTO,
} from '@coderscamp/shared/models/user';
import type { GithubUser } from '../auth/github/github.types';
import type { JwtPayload } from '../auth/jwt/jwt.types';
import type { UserFromGithub, UserFromJwt } from './users.types';

import type { GithubDTO } from '../auth/github/github.model';

export class UsersMapper {
  static userToDomain(value: UserInformationDTO): UserInformation {
    return value;
  }
    
  static fromGithubToDomain(user: GithubUser): UserFromGithub {

    // ! new user may not set his email address to public and also he may not set his name.
    return {
      fullName: user.name,
      email: user.email,
      image: user.avatar_url,
      githubId: user.id,
    };
  }

  static userToPlain(value: RegisteredUser): RegisteredUserDTO;
  static userToPlain(value: UserInformation): UserInformationDTO {
    return value;
  }

  static registeredUserToPlain(value: RegisteredUser): RegisteredUserDTO {
    return value;
  }

  static userSurveyToDomain(data: UserSurveyDTO): UserSurvey {
    return data;
  }

  static userSurveyToPlain(data: UserSurvey): UserSurveyDTO {
    return data;
  }

  static fromJwtToDomain(payload: JwtPayload): UserFromJwt {
    return {
      id: Number(payload.sub),
    };
  }

  static fromDomainToJwt(user: UserFromJwt): JwtPayload {
    return {
      sub: String(user.id),
    };
  }
}
