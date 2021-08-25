import { Module } from '@nestjs/common';

import { SharedModule } from '../write/common/shared.module';
import { SendEmailWhenLearningMaterialsWereGeneratedAutomation } from './send-email-when-learning-materials-were-generated.automation';

@Module({
  imports: [SharedModule],
  providers: [SendEmailWhenLearningMaterialsWereGeneratedAutomation],
})
export class AutomationModule {}
