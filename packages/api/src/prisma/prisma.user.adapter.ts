import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import type { UserId } from '@coderscamp/shared/models';

import { UserRepositoryPort } from '../contracts/user.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByGithubId(githubId: number) {
    return this.prisma.user.findUnique({ where: { githubId } });
  }

  async update(userData: User) {
    return this.prisma.user.update({ where: { id: userData.id }, data: userData });
  }

  async findById(userId: UserId) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
