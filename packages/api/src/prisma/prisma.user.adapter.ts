import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PopulatedUser } from '@coderscamp/shared/models/user';

import { UserRepository } from '../contracts/user.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserAdapter implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User) {
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

  async saveSurvey({ id, Survey: survey, ...user }: PopulatedUser) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...user,
        Survey: { create: { ...survey } },
      },
      include: { Survey: true },
    }) as unknown as PopulatedUser;
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: { Survey: true } });
  }
}
