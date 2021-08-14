import type { RegisteredUser, RegisteredUserDTO, User, UserDTO } from '@coderscamp/shared/models';

export class UsersMapper {
  static userToDomain(value: UserDTO): User {
    return value;
  }

  static userToPlain(value: RegisteredUser): RegisteredUserDTO;
  static userToPlain(value: User): UserDTO {
    return value;
  }

  static registeredUserToPlain(value: RegisteredUser): RegisteredUserDTO {
    return value;
  }
}
