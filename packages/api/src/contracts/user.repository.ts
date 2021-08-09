import { Survey } from '@coderscamp/shared/models/survey';
import { RegisteredUser, User, UserSurvey } from '@coderscamp/shared/models/user';

export abstract class UserRepositoryPort {
  abstract create(data: Omit<RegisteredUser, 'id'>): Promise<User | RegisteredUser>;

  abstract findByGithubId(githubId: number): Promise<User | RegisteredUser | null>;

  abstract findById(id: number): Promise<User | RegisteredUser | null>;

  abstract update(data: User): Promise<User | RegisteredUser>;

  abstract getUser(userId: number): Promise<((UserSurvey | RegisteredUser) & { Survey: Survey | null }) | null>;
}
