import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import type { Survey, UserSurveyDTO } from '@coderscamp/shared/models';

import { UpdateUserCommand } from '../users/commands';
import { SaveFilledSurveyCommand } from './commands';
import { SurveyMapper } from './survey.mapper';

@Controller('surveys')
export class SurveyController {
  constructor(private commandBus: CommandBus) {}

  @Post('')
  async saveUserSurvey(@Body() userSurveyDTO: UserSurveyDTO): Promise<{ message: string }> {
    const { Survey: survey, ...user } = SurveyMapper.surveyToDomain(userSurveyDTO);

    await this.commandBus.execute(new UpdateUserCommand(user));
    await this.commandBus.execute<SaveFilledSurveyCommand, Survey>(new SaveFilledSurveyCommand(survey));

    return { message: 'Operation successful' };
  }
}
