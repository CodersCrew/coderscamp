import { UserId } from '../../shared/core/user-id';

export const USERS_FULL_NAMES = Symbol('USERS_FULL_NAMES');
export interface UsersFullNames {
  findUserById(userId: UserId): Promise<{ fullName: string } | undefined>;
}
