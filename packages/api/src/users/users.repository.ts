import { Injectable } from '@nestjs/common';

import type { User } from '@coderscamp/shared/models/user';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({ data: userData });
  }

  async getByGithubId(githubId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { githubId } });
  }
}
