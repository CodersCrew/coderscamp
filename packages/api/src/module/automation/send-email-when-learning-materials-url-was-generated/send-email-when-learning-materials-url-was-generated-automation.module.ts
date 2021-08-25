import { Module } from '@nestjs/common';

import { SharedModule } from '../../write/shared/shared.module';
import { LearningMaterialsUrlWasGeneratedEventHandler } from './learning-materials-url-was-generated-event-handler.service';

@Module({
  imports: [SharedModule],
  providers: [LearningMaterialsUrlWasGeneratedEventHandler],
})
export class SendEmailWhenLearningMaterialsUrlWasGeneratedAutomationModule {}
