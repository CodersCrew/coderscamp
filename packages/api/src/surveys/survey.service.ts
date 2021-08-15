import { BadRequestException, Injectable } from '@nestjs/common';

import { SurveyErrorMessage } from '@coderscamp/shared/api';
import type { RegisteredUser, Survey, User } from '@coderscamp/shared/models';

import { UsersService } from '../users/users.service';
import { SurveyRepository } from './survey.repository';
import type { UserSurveyUpdateData } from './types';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository, private readonly usersService: UsersService) {}

  async saveUserSurvey(surveyData: UserSurveyUpdateData): Promise<[RegisteredUser | User, Survey]> {
    const { Survey: survey, ...user } = surveyData;
    const surveyFromDb = await this.surveyRepository.findByUserId(user.id);

    if (surveyFromDb) throw new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED);

    const savedSurvey = await this.surveyRepository.save(survey);

    const updatedUser = await this.usersService.update(user);

    return [updatedUser, savedSurvey];
  }
}
