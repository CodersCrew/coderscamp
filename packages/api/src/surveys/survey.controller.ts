import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { SurveyPostRequest, SurveyPostResponse } from '@coderscamp/shared/api';
import type { Survey, UserId as Id } from '@coderscamp/shared/models';
import { surveySchema } from '@coderscamp/shared/schemas';

import { YupValidationPipe } from '@/common/yupValidationPipe';

import { UserId } from '../auth/jwt/user-id.decorator';
import { UpdateUserCommand } from '../users/commands';
import { SaveFilledSurveyCommand } from './commands';
import { SurveyMapper } from './survey.mapper';

@Controller('surveys')
export class SurveyController {
  constructor(private commandBus: CommandBus) {}

  @Post('')
  @UsePipes(new YupValidationPipe(surveySchema))
  async saveUserSurvey(
    @Body() surveyPostRequest: SurveyPostRequest,
    @UserId() userId: Id,
  ): Promise<SurveyPostResponse> {
    const { Survey: survey, ...user } = SurveyMapper.surveyPostRequestToDomain({ id: userId, ...surveyPostRequest });

    await this.commandBus.execute(new UpdateUserCommand(user));
    await this.commandBus.execute<SaveFilledSurveyCommand, Survey>(new SaveFilledSurveyCommand(survey));

    return { message: 'Operation successful' };
  }
}
