import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { SurveyDTO } from '@coderscamp/shared/models/survey';

import { SaveSurveyCommand } from './commands';
import { SurveyMapper } from './survey.mapper';

@Controller('surveys')
export class SurveyController {
  constructor(private commandBus: CommandBus) {}

  @Post('survey')
  async saveUserSurvey(@Body() userSurveyDTO: SurveyDTO): Promise<SurveyDTO> {
    const command = new SaveSurveyCommand(SurveyMapper.surveyToDomain(userSurveyDTO));

    return SurveyMapper.surveyToPlain(await this.commandBus.execute(command));
  }
}
