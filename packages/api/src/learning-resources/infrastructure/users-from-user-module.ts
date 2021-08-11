import {UsersFullNamesPort} from "../core/usersFullNames";
import {UserId} from "../../shared/user-id";
import {UsersRepository} from "../../users/users.repository";

export class UsersFromUserModule implements UsersFullNamesPort {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  async findUserById(userId: UserId): Promise<{ fullName: string } | undefined> {
    const user = await this.usersRepository.getById(parseInt(userId))
    return user ? {fullName: user.fullName} : undefined
  }

}
