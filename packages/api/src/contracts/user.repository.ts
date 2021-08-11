import type { RegisteredUser, Survey, User, UserId, UserSurvey } from '@coderscamp/shared/models';

export abstract class UserRepositoryPort {
  abstract findByGithubId(githubId: number): Promise<User | RegisteredUser | null>;

  abstract findById(id: UserId): Promise<User | RegisteredUser | null>;

  abstract update(data: User): Promise<User | RegisteredUser>;
}
