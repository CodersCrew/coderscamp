import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SaveFilledSurveyHandler } from './commands';
import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';

export const CommandHandlers = [SaveFilledSurveyHandler];
@Module({
  imports: [CqrsModule],
  providers: [SurveyRepository, ...CommandHandlers],
  controllers: [SurveyController],
})
export class SurveyModule {}
