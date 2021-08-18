import { Injectable } from '@nestjs/common';

import type { User } from '@coderscamp/shared/models/user';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.findMany();
  }

  create(userData: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.create({ data: userData });
  }

  getById(id: number): Promise<User | null> {
    return this.usersRepository.findUnique({ where: { id } });
  }

  getByGithubId(githubId: number): Promise<User | null> {
    return this.usersRepository.findUnique({ where: { githubId } });
  }
}
