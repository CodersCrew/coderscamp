import type {
  RegisteredUser,
  RegisteredUserDTO,
  UserInformation,
  UserInformationDTO,
  UserSurvey,
  UserSurveyDTO,
} from '@coderscamp/shared/models/user';

import type { GithubDTO } from '../auth/github/github.model';

export class UsersMapper {
  static userToDomain(value: UserInformationDTO): UserInformation {
    return value;
  }

  static fromGithubToDomain(value: GithubDTO): Omit<RegisteredUserDTO, 'id'> {
    const { email, id, avatar_url: image, name } = value;

    return {
      email,
      githubId: id,
      image,
      fullName: name,
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
}
