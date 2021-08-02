import { Injectable } from '@nestjs/common';

import type { GithubUserData } from '../auth/github/github.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getByGithubId(id: number) {
    return this.usersRepository.getByGithubId(id);
  }

  async register(userData: GithubUserData) {
    return this.usersRepository.create(userData);
  }
}
