import { Inject, Injectable } from '@nestjs/common';

import type { Survey, UserId } from '@coderscamp/shared/models';

import { SURVEY_REPOSITORY_PORT, SurveyRepositoryPort } from '../contracts/survey.repository';

@Injectable()
export class SurveyRepository {
  constructor(@Inject(SURVEY_REPOSITORY_PORT) private readonly repository: SurveyRepositoryPort) {}

  async findSurveyByUserId(userId: UserId) {
    return this.repository.findSurveyByUserId(userId);
  }

  async save(data: Survey) {
    return this.repository.save(data);
  }
}
