import { Injectable } from '@nestjs/common';

import type { Survey, UserId } from '@coderscamp/shared/models';

import { SurveyRepositoryPort } from '../contracts/survey.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaSurveyAdapter implements SurveyRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: UserId) {
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
}
