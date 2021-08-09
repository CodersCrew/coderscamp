import { Injectable } from '@nestjs/common';

import { RegisteredUser } from '@coderscamp/shared/models/user';

import { GithubRepositoryPort } from '../contracts/github.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaGithubAdapter implements GithubRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByGithubId(githubId: number) {
    return this.prisma.user.findUnique({ where: { githubId } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(data: Omit<RegisteredUser, 'id'>) {
    return this.prisma.user.create({ data });
  }
}
