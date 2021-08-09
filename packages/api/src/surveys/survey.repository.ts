import { Injectable } from '@nestjs/common';

import { Survey } from '@coderscamp/shared/models/survey';

import { PrismaSurveyAdapter } from '../prisma/prisma..survey.adapter';

@Injectable()
export class SurveyRepository {
  constructor(private readonly repository: PrismaSurveyAdapter) {}

  async findByUserId(userId: number) {
    return this.repository.findByUserId(userId);
  }

  async save(data: Survey) {
    return this.repository.save(data);
  }
}
