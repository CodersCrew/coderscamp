import { UserId } from '../../shared/user-id';
import { UsersRepository } from '../../users/users.repository';
import { UsersFullNames } from '../core/users-full-names.port';

/** *
 * Anti-corruption layer (adapter from Ports & Adapter architecture) which invert dependency,
 * whole LearningResources module is not dependent on Users module internals like user representation in database.
 */
export class UserModuleToUsersFullNamesAdapter implements UsersFullNames {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserById(userId: UserId): Promise<{ fullName: string } | undefined> {
    const user = await this.usersRepository.getById(parseInt(userId, 10));

    return user ? { fullName: user.fullName } : undefined;
  }
}
