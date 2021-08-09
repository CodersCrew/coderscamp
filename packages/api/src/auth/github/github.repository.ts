import { Injectable } from '@nestjs/common';

import { RegisteredUser } from '@coderscamp/shared/models/user';

import { GithubRepositoryPort } from '../../contracts/github.repository';

@Injectable()
export class GithubRepository {
  constructor(private readonly repository: GithubRepositoryPort) {}

  async findUserById(id: number) {
    return this.repository.findById(id);
  }

  async findUserByGithubId(id: number) {
    return this.repository.findByGithubId(id);
  }

  async createUser(data: Omit<RegisteredUser, 'id'>) {
    return this.repository.createUser(data);
  }
}
