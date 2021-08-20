import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UsersRepository } from './users.repository';
import type { UserId } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.findMany();
  }

  create(userData: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.create({ data: userData });
  }

  getById(id: UserId): Promise<User | null> {
    return this.usersRepository.findUnique({ where: { id } });
  }
}
