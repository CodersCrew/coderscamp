import { Injectable } from '@nestjs/common';

import type { Survey, UserSurvey } from '@coderscamp/shared/models';

import { SurveyRepositoryPort } from '../contracts/survey.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaSurveyAdapter implements SurveyRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: number) {
    return this.prisma.survey.findUnique({ where: { userId } });
  }

  async save({ userId, ...survey }: Survey) {
    return this.prisma.survey.create({
      data: {
        userId,
        ...survey,
      },
    });
  }

  async saveAndUpdateRelatedUser({ Survey: survey, ...user }: UserSurvey) {
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
        Survey: { create: survey },
      },
    }) as unknown as UserSurvey;
    // TODO: find a better way to represent fact that user and survey are completed
  }
}
