import type { RegisteredUser, User, UserId } from '@coderscamp/shared/models';

export abstract class GithubRepositoryPort {
  abstract findByGithubId(githubId: number): Promise<User | RegisteredUser | null>;

  abstract findById(id: UserId): Promise<User | RegisteredUser | null>;

  abstract createUser(data: RegisteredUser): Promise<User | RegisteredUser>;
}
