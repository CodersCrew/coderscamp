import { Module } from '@nestjs/common';

import { EventStreamName } from '../../shared/application/event-stream-name.valueboject';
import { SharedModule } from '../../shared/shared.module';
import { GenerateLearningMaterialsUrlCommandHandler } from './application/generate-learning-materials-url.command-handler';
import { GeneratedEventHandler } from './application/generated.event-handler';
import { LEARNING_MATERIALS_URL_GENERATOR } from './application/learning-materials-url-generator';
import { PuppeteerLearningMaterialsGenerator } from './infrastructure/puppeteer-learning-materials-generator';
import { LearningMaterialsUrlController } from './presentation/rest/learning-materials-url.controller';
import {TypeHandler} from "./application/type.handler";

export const learningMaterialsUrlEventStreamName = (props: { userId: string }) =>
  EventStreamName.from('LearningMaterialsUrl', props.userId);

@Module({
  imports: [SharedModule],
  controllers: [LearningMaterialsUrlController],
  providers: [
    GenerateLearningMaterialsUrlCommandHandler,
    { provide: LEARNING_MATERIALS_URL_GENERATOR, useClass: PuppeteerLearningMaterialsGenerator },
    GeneratedEventHandler,
    TypeHandler,
  ],
})
export class LearningMaterialsUrlModule {}
