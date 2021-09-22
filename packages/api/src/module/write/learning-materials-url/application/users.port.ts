import type { UserId } from '@/shared/domain.types';

export const USERS_PORT = Symbol('USERS_PORT');

export interface UsersPort {
  getUserFullNameById(userId: UserId): Promise<string>;
}
