import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { GenerateLearningMaterialsUrlCommandHandler } from './core/generate-learning-materials-url.command-handler';
import { LearningMaterialsUrlController } from './presentation/rest/generate-learning-materials-url.controller';

@Module({
  imports: [SharedModule],
  controllers: [LearningMaterialsUrlController],
  providers: [GenerateLearningMaterialsUrlCommandHandler],
})
export class GenerateLearningMaterialsUrlModule {}
