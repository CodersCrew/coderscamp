import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { Survey } from '@coderscamp/shared/models/user';

import { UserRepositoryService } from '../contracts/user.repository.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserAdapter implements UserRepositoryService {
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

  async saveSurvey(survey: Survey) {
    return this.prisma.survey.create({
      data: { ...survey },
    });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: { Survey: true } });
  }
}
