import { Injectable } from '@nestjs/common';

import type { Survey, UserSurvey } from '@coderscamp/shared/models';

import { SurveyRepositoryPort } from '../contracts/survey.repository';

@Injectable()
export class SurveyRepository {
  constructor(private readonly repository: SurveyRepositoryPort) {}

  async findByUserId(userId: number) {
    return this.repository.findByUserId(userId);
  }

  async save(data: Survey) {
    return this.repository.save(data);
  }

  saveAndUpdateRelatedUser(data: UserSurvey) {
    return this.repository.saveAndUpdateRelatedUser(data);
  }
}
