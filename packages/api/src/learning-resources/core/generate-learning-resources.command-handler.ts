import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import dayjs from 'dayjs';

import { GenerateLearningResources } from '../api/generate-learning-resources.command';
import { LearningResourcesWereGenerated } from '../api/learning-resources-were-generated.event';
import { LEARNING_RESOURCES_REPOSITORY, LearningResourcesRepository } from './learning-resources.repository';
import { LEARNING_RESOURCES_GENERATOR, LearningResourcesGenerator } from './learning-resources-generator';
import { TIME_PROVIDER, TimeProvider } from './time-provider.port';

@CommandHandler(GenerateLearningResources)
export class GenerateLearningResourcesCommandHandler implements ICommandHandler<GenerateLearningResources> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(LEARNING_RESOURCES_REPOSITORY) private readonly repository: LearningResourcesRepository,
    @Inject(LEARNING_RESOURCES_GENERATOR) private readonly learningResourcesGenerator: LearningResourcesGenerator,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
  ) {}

  async execute(command: GenerateLearningResources): Promise<void> {
    const existingLearningResources = await this.repository.findByUserId(command.userId);
    const currentTime = this.timeProvider.currentTime();

    const resourcesWereGeneratedInLast24Hours =
      existingLearningResources && dayjs(currentTime).diff(existingLearningResources.generatedAt, 'hours') < 24;

    if (resourcesWereGeneratedInLast24Hours) {
      throw new Error('You cannot generate learning resources frequently than 24 hours.');
    }

    const learningResources = await this.learningResourcesGenerator.generateFor(command.userId);

    await this.repository.save(learningResources);

    const event = new LearningResourcesWereGenerated(
      this.timeProvider.currentTime(),
      learningResources.id,
      command.userId,
      learningResources.resourcesUrl,
    );

    this.eventBus.publish(event);
  }
}
