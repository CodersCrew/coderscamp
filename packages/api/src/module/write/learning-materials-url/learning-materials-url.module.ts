import { Module } from '@nestjs/common';

import { SharedModule } from '../common/shared.module';
import { GenerateLearningMaterialsUrlCommandHandler } from './application/generate-learning-materials-url.command-handler';
import { LEARNING_MATERIALS_URL_GENERATOR } from './application/learning-materials-url-generator';
import { PuppeteerLearningMaterialsGenerator } from './infrastructure/puppeteer-learning-materials-generator';
import { LearningMaterialsUrlController } from './presentation/rest/learning-materials-url.controller';

@Module({
  imports: [SharedModule],
  controllers: [LearningMaterialsUrlController],
  providers: [
    GenerateLearningMaterialsUrlCommandHandler,
    { provide: LEARNING_MATERIALS_URL_GENERATOR, useClass: PuppeteerLearningMaterialsGenerator }
  ],
})
export class LearningMaterialsUrlModule {}
