import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import type { UserId } from '@coderscamp/shared/models';

import { GithubRepositoryPort } from '../../contracts/github.repository';
import type { NotRegisteredUser } from './github.types';

@Injectable()
export class GithubRepository {
  constructor(private readonly repository: GithubRepositoryPort) {}

  async findUserById(id: UserId) {
    return this.repository.findById(id);
  }

  async findUserByGithubId(id: number) {
    return this.repository.findByGithubId(id);
  }

  async createUser(userData: NotRegisteredUser) {
    return this.repository.createUser({ ...userData, id: nanoid() });
  }
}
