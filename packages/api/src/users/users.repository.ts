import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import type { NotRegisteredUser, RegisteredUser, User, UserId } from '@coderscamp/shared/models';

import { USER_REPOSITORY_PORT, UserRepositoryPort } from '../contracts/user.repository';

@Injectable()
export class UsersRepository {
  constructor(@Inject(USER_REPOSITORY_PORT) private readonly repository: UserRepositoryPort) {}

  async findByGithubId(githubId: number): Promise<RegisteredUser | User | null> {
    return this.repository.findByGithubId(githubId);
  }

  async updateUser(data: Partial<User>): Promise<User> {
    return this.repository.update(data) as unknown as User;
  }

  async findById(id: UserId) {
    return this.repository.findById(id);
  }

  async create(user: NotRegisteredUser) {
    return this.repository.createUser({ ...user, id: nanoid() });
  }
}
