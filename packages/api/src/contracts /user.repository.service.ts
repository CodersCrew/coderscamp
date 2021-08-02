import { RegisteredUser, Survey, User, UserInformation } from '@coderscamp/shared/models/user';

export abstract class UserRepositoryService {
  abstract create(data: Omit<RegisteredUser, 'id'>): Promise<UserInformation | RegisteredUser>;

  abstract findByGithubId(githubId: number): Promise<UserInformation | RegisteredUser | null>;

  abstract findById(id: number): Promise<UserInformation | RegisteredUser | null>;

  abstract update(data: UserInformation): Promise<UserInformation | RegisteredUser>;

  abstract saveSurvey(data: Survey): Promise<Survey>;

  abstract getUser(userId: number): Promise<((User | RegisteredUser) & { Survey: Survey | null }) | null>;
}
