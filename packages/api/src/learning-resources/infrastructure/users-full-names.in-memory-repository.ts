import { UserId } from '../../shared/core/user-id';
import { UsersFullNames } from '../core/users-full-names.port';

export class UsersFullNamesInMemoryRepository implements UsersFullNames {
  private readonly entities: { [id: string]: { fullName: string } } = {};

  constructor(entities: { [p: string]: { fullName: string } }) {
    this.entities = entities;
  }

  findUserById(userId: UserId): Promise<{ fullName: string } | undefined> {
    return Promise.resolve(this.entities[userId]);
  }
}
