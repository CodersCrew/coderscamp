import { Injectable } from '@nestjs/common';
import { SurveyRepository as Repository } from 'src/contracts/survey.repository';

import { Survey } from '@coderscamp/shared/models/survey';

@Injectable()
export class SurveyRepository {
  constructor(private readonly repository: Repository) {}

  async findByUserId(userId: number) {
    return this.repository.findByUserId(userId);
  }

  async save(data: Survey) {
    return this.repository.save(data);
  }
}
