import { Injectable } from '@nestjs/common';

import type { User } from '@coderscamp/shared/models/user';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async create(userData: Omit<User, 'id'>) {
    return this.prisma.user.create({ data: userData });
  }

  async update(id: number, data: User) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getByGithubId(githubId: number) {
    return this.prisma.user.findUnique({ where: { githubId } });
  }
}
