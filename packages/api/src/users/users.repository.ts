import { Injectable } from '@nestjs/common';

import type { RegisteredUser, Survey, UserInformation } from '@coderscamp/shared/models/user';

import type { GithubUserData } from '../auth/github/github.model';
import { UserRepositoryService } from '../contracts /user.repository.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async create(userData: GithubUserData): Promise<RegisteredUser> {
    return this.userRepositoryService.create(userData);
  }

  async getByGithubId(githubId: number): Promise<RegisteredUser | UserInformation | null> {
    return this.userRepositoryService.findByGithubId(githubId);
  }

  async updateUser(data: UserInformation): Promise<UserInformation> {
    return this.userRepositoryService.update(data) as unknown as UserInformation;
  }

  async getUser(id: number) {
    return this.userRepositoryService.getUser(id);
  }

  async saveSurvey(data: Survey): Promise<Survey> {
    return this.userRepositoryService.saveSurvey(data);
  }
}
