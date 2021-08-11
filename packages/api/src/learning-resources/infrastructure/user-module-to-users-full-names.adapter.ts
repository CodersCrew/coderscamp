import {UserId} from "../../shared/user-id";
import {UsersRepository} from "../../users/users.repository";
import {UsersFullNames} from "../core/users-full-names.port";

export class UserModuleToUsersFullNamesAdapter implements UsersFullNames {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  async findUserById(userId: UserId): Promise<{ fullName: string } | undefined> {
    const user = await this.usersRepository.getById(parseInt(userId))
    return user ? {fullName: user.fullName} : undefined
  }

}
