import type { User } from '@coderscamp/shared/models/user';

import type { GithubDTO } from '../auth/github/github.model';
import type { UserDTO } from './users.model';

export class UsersMapper {
  static toDomain(value: UserDTO): User {
    return value as User;
  }

  static toDomainMany(values: UserDTO[]): User[] {
    return values as User[];
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
    return value as UserDTO;
  }

  static toPlainMany(values: User[]): UserDTO[] {
    return values as UserDTO[];
  }
}
