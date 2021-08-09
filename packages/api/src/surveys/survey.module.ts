import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SurveyController } from './survey.controller';

@Module({
  imports: [CqrsModule],
  providers: [],
  controllers: [SurveyController],
})
export class SurveyModule {}
