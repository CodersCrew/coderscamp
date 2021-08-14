import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [UsersModule],
  providers: [UsersService, SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
