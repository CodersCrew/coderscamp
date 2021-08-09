import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { RegisteredUser } from '@coderscamp/shared/models/user';

import { UserRepositoryPort } from '../contracts/user.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<RegisteredUser, 'id'>) {
    return this.prisma.user.create({ data });
  }

  async findByGithubId(githubId: number) {
    return this.prisma.user.findUnique({ where: { githubId } });
  }

  async update(data: User) {
    return this.prisma.user.update({ where: { id: data.id }, data });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: { Survey: true } });
  }
}
