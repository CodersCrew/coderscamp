import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import type { UserSurveyDTO } from '@coderscamp/shared/models';

import { SaveSurveyCommand } from './commands';
import { SurveyMapper } from './survey.mapper';

@Controller('surveys')
export class SurveyController {
  constructor(private commandBus: CommandBus) {}

  @Post('')
  async saveUserSurvey(@Body() userSurveyDTO: UserSurveyDTO): Promise<UserSurveyDTO> {
    const command = new SaveSurveyCommand(SurveyMapper.surveyToDomain(userSurveyDTO));

    return SurveyMapper.surveyToPlain(await this.commandBus.execute(command));
  }
}
