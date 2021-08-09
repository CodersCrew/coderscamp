import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SaveSurveyHandler } from './commands';
import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';

const CommandHandlers = [SaveSurveyHandler];
@Module({
  imports: [CqrsModule],
  providers: [SurveyRepository, ...CommandHandlers],
  controllers: [SurveyController],
})
export class SurveyModule {}
