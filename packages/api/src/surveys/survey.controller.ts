import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

import { SurveyPostRequest } from '@coderscamp/shared/api';
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
    @Res() res: Response,
  ): Promise<void> {
    const data = SurveyMapper.surveyPostRequestToDomain({ ...userSurveyRequest, id: userId });

    await this.surveyService.saveUserSurvey(data);

    res.sendStatus(204);
  }
}
