import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { GenerateLearningMaterialsUrlCommandHandler } from './core/generate-learning-materials-url.command-handler';
import { LEARNING_MATERIALS_URL_GENERATOR } from './core/learning-materials-url-generator';
import { PuppeteerLearningMaterialsGenerator } from './infrastructure/puppeteer-learning-materials-generator';
import { LearningMaterialsUrlController } from './presentation/rest/generate-learning-materials-url.controller';

@Module({
  imports: [SharedModule],
  controllers: [LearningMaterialsUrlController],
  providers: [
    GenerateLearningMaterialsUrlCommandHandler,
    { provide: LEARNING_MATERIALS_URL_GENERATOR, useClass: PuppeteerLearningMaterialsGenerator },
  ],
})
export class GenerateLearningMaterialsUrlModule {}
