export const USERS_PORT = Symbol('USERS_PORT');

export interface UsersPort {
  getUserFullNameById(userId: number): Promise<string>;
}
