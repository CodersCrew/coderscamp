import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { SurveyErrorMessage } from '@coderscamp/shared/api';
import type { RegisteredUser, Survey, User } from '@coderscamp/shared/models';

import { SurveyRepository } from './survey.repository';
import type { UserSurveyUpdateData } from './types';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository, private readonly usersService: UsersService) {}

  async saveUserSurvey(surveyData: UserSurveyUpdateData): Promise<[Promise<RegisteredUser | User>, Promise<Survey>]> {
    const { Survey: survey, ...user } = surveyData;
    const surveyFromDb = await this.surveyRepository.findByUserId(user.id);

    if (surveyFromDb) throw new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED);

    const savedSurvey = this.surveyRepository.save(survey);

    const updatedUser = this.usersService.update(user);

    return [updatedUser, savedSurvey];
  }
}
