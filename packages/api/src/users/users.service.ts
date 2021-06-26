import { Injectable } from '@nestjs/common';

import { User } from '@coderscamp/shared/models/user';

import { GithubUserData } from '../auth/auth.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async create(userData: GithubUserData) {
    return this.prisma.user.create({ data: { ...userData, firstName: null, lastName: null } });
  }

  async update(id: number, data: User) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByGithubId(githubId: number) {
    return this.prisma.user.findUnique({ where: { githubId } });
  }
}
