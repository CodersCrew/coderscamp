import {Module} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {GenerateLearningResourcesCommandHandler} from "./core/generate-learning-resources.command-handler";
import {WhatAreLearningResourcesForUserQueryHandler} from "./core/what-are-learning-resources-for-user.query-handler";
import {LEARNING_RESOURCES_REPOSITORY} from "./core/learning-resources.repository";
import {LearningResourcesInMemoryRepository} from "./infrastructure/learning-resources.in-memory-repository";
import {LEARNING_RESOURCES_GENERATOR} from "./core/learning-resources-generator";
import {PuppeteerLearningResourcesGenerator} from "./infrastructure/puppeteer-learning-resources-generator";

@Module({
  imports: [CqrsModule],
  providers: [
    GenerateLearningResourcesCommandHandler,
    WhatAreLearningResourcesForUserQueryHandler,
    {
      provide: LEARNING_RESOURCES_REPOSITORY,
      useClass: LearningResourcesInMemoryRepository //todo: leave for unit test, replace for prod with real database
    },
    {
      provide: LEARNING_RESOURCES_GENERATOR,
      useValue: new PuppeteerLearningResourcesGenerator() //todo: leave for unit test, replace for prod with real database
    }
  ]
})
export class LearningResourcesModule {

}
