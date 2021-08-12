import type { RegisteredUser, User, UserId } from '@coderscamp/shared/models';

export abstract class UserRepositoryPort {
  abstract findByGithubId(githubId: number): Promise<User | RegisteredUser | null>;

  abstract findById(id: UserId): Promise<User | RegisteredUser | null>;

  abstract update(data: User): Promise<User | RegisteredUser>;

  abstract createUser(data: RegisteredUser): Promise<User | RegisteredUser>;
}
