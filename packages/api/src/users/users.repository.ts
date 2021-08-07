import { Injectable } from '@nestjs/common';

import type { RegisteredUser, User } from '@coderscamp/shared/models/user';

import { UserRepository } from '../contracts/user.repository';

@Injectable()
export class UsersRepository {
  constructor(private readonly userRepositoryService: UserRepository) {}

  async create(userData: RegisteredUser): Promise<RegisteredUser> {
    return this.userRepositoryService.create(userData);
  }

  async getByGithubId(githubId: number): Promise<RegisteredUser | User | null> {
    return this.userRepositoryService.findByGithubId(githubId);
  }

  async updateUser(data: User): Promise<User> {
    return this.userRepositoryService.update(data) as unknown as User;
  }

  async findById(id: number) {
    return this.userRepositoryService.findById(id);
  }

  async getUser(id: number) {
    return this.userRepositoryService.getUser(id);
  }
}
