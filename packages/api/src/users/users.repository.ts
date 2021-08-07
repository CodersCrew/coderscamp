import { Injectable } from '@nestjs/common';

import type { RegisteredUser, User, UserInformation } from '@coderscamp/shared/models/user';

import type { GithubUserData } from '../auth/github/github.model';
import { UserRepositoryService } from '../contracts/user.repository.service';

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

  async findById(id: number) {
    return this.userRepositoryService.findById(id);
  }

  async getUser(id: number) {
    return this.userRepositoryService.getUser(id);
  }
  
}
