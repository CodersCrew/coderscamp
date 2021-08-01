import type { User, UserDTO } from '@coderscamp/shared/models/user';

import type { GithubDTO } from '../auth/github/github.types';

export class UsersMapper {
  static toDomain(value: UserDTO): User {
    return value;
  }

  static toDomainMany(values: UserDTO[]): User[] {
    return values;
  }

  static fromGithubInputToDomain(value: GithubDTO): Omit<User, 'id'> {
    const { email, id, avatar_url: image, name } = value;

    return {
      email,
      githubId: id,
      image,
      fullName: name,
    };
  }

  static toPlain(value: User): UserDTO {
    return value;
  }

  static toPlainMany(values: User[]): UserDTO[] {
    return values;
  }
}
