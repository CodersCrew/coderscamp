import { Injectable } from '@nestjs/common';

import type { RegisteredUser, User } from '@coderscamp/shared/models/user';

import { UserRepositoryPort } from '../contracts/user.repository';

@Injectable()
export class UsersRepository {
  constructor(private readonly repository: UserRepositoryPort) {}

  async create(userData: Omit<RegisteredUser, 'id'>): Promise<RegisteredUser> {
    return this.repository.create(userData);
  }

  async getByGithubId(githubId: number): Promise<RegisteredUser | User | null> {
    return this.repository.findByGithubId(githubId);
  }

  async updateUser(data: User): Promise<User> {
    return this.repository.update(data) as unknown as User;
  }

  async findById(id: number) {
    return this.repository.findById(id);
  }

  async getUser(id: number) {
    return this.repository.getUser(id);
  }
}
