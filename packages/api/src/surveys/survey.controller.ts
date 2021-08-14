import { Body, Controller, Post } from '@nestjs/common';

import { SurveyPostRequest, SurveyPostResponse } from '@coderscamp/shared/api';
import { UserId as Id } from '@coderscamp/shared/models';

import { UserId } from '../auth/jwt/user-id.decorator';
import { SurveyMapper } from './survey.mapper';
import { SurveyService } from './survey.service';

@Controller('surveys')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Post('survey')
  async saveUserSurvey(
    @Body() userSurveyRequest: SurveyPostRequest,
    @UserId() userId: Id,
  ): Promise<SurveyPostResponse> {
    const data = SurveyMapper.surveyPostRequestToDomain({ ...userSurveyRequest, id: userId });

    await this.surveyService.saveUserSurvey(data);

    return { message: 'Operation successful' };
  }
}
