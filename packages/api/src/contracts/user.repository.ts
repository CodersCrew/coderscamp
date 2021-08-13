import type { RegisteredUser, User, UserId } from '@coderscamp/shared/models';

export const USER_REPOSITORY_PORT = Symbol('UserRepositoryPort');
export interface UserRepositoryPort {
  findByGithubId(githubId: number): Promise<User | RegisteredUser | null>;

  findById(id: UserId): Promise<User | RegisteredUser | null>;

  update(data: User): Promise<User | RegisteredUser>;

  createUser(data: RegisteredUser): Promise<User | RegisteredUser>;
}
