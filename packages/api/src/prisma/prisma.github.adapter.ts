import { Injectable } from '@nestjs/common';

import type { RegisteredUser, UserId } from '@coderscamp/shared/models';

import { GithubRepositoryPort } from '../contracts/github.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaGithubAdapter implements GithubRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByGithubId(githubId: number) {
    return this.prisma.user.findUnique({ where: { githubId } });
  }

  async findById(userId: UserId) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async createUser(notRegisteredUser: RegisteredUser) {
    return this.prisma.user.create({ data: notRegisteredUser });
  }
}
