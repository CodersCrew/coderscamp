import type { UserId } from '@/crud/user-profiles/users.types';

export const USERS_PORT = Symbol('USERS_PORT');

export interface UsersPort {
  getUserFullNameById(userId: UserId): Promise<string>;
}
