import { Injectable } from '@nestjs/common';

import type { RegisteredUser, User, UserId } from '@coderscamp/shared/models';

import { UserRepositoryPort } from '../contracts/user.repository';

@Injectable()
export class UsersRepository {
  constructor(private readonly repository: UserRepositoryPort) {}

  async getByGithubId(githubId: number): Promise<RegisteredUser | User | null> {
    return this.repository.findByGithubId(githubId);
  }

  async updateUser(data: User): Promise<User> {
    return this.repository.update(data) as unknown as User;
  }

  async findById(id: UserId) {
    return this.repository.findById(id);
  }
}
