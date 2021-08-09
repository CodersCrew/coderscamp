import { RegisteredUser, User } from '@coderscamp/shared/models/user';

export abstract class GithubRepositoryPort {
  abstract findByGithubId(githubId: number): Promise<User | RegisteredUser | null>;

  abstract findById(id: number): Promise<User | RegisteredUser | null>;

  abstract createUser(data: Omit<RegisteredUser, 'id'>): Promise<User | RegisteredUser>;
}
