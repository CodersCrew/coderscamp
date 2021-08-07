import { Survey } from '@coderscamp/shared/models/survey';
import { PopulatedUser, RegisteredUser, User } from '@coderscamp/shared/models/user';

export abstract class UserRepository {
  abstract create(data: Omit<RegisteredUser, 'id'>): Promise<User | RegisteredUser>;

  abstract findByGithubId(githubId: number): Promise<User | RegisteredUser | null>;

  abstract findById(id: number): Promise<User | RegisteredUser | null>;

  abstract update(data: User): Promise<User | RegisteredUser>;

  abstract getUser(userId: number): Promise<((PopulatedUser | RegisteredUser) & { Survey: Survey | null }) | null>;
}
