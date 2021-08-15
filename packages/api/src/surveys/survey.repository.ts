import { Injectable } from '@nestjs/common';

import { Survey } from '@coderscamp/shared/models/survey';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SurveyRepository {
  constructor(private readonly repository: PrismaService) {}

  async findByUserId(userId: number): Promise<Survey | null> {
    return this.repository.survey.findUnique({ where: { userId } });
  }

  async save({ userId, ...survey }: Survey): Promise<Survey> {
    return this.repository.survey.create({
      data: {
        userId,
        ...survey,
      },
    });
  }
}
