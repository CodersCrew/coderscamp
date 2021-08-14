import { Injectable } from '@nestjs/common';

import type { RegisteredUser, User } from '@coderscamp/shared/models/user';

import { PrismaService } from '../prisma/prisma.service';
import type { UserFromGithub } from './users.types';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<User[] | RegisteredUser[] | null> {
    return this.prisma.user.findMany();
  }

  async create(userData: UserFromGithub): Promise<RegisteredUser> {
    return this.prisma.user.create({ data: userData });
  }

  async getById(id: number): Promise<User | RegisteredUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getByGithubId(githubId: number): Promise<User | RegisteredUser | null> {
    return this.prisma.user.findUnique({ where: { githubId } });
  }

  async update(userData: Partial<User>): Promise<User | RegisteredUser> {
    return this.prisma.user.update({ where: { id: userData.id }, data: userData });
  }
}
