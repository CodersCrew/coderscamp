import { Injectable } from '@nestjs/common';
import { SurveyRepositoryPort } from 'src/contracts/survey.repository';

import { Survey } from '@coderscamp/shared/models/survey';

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
}
