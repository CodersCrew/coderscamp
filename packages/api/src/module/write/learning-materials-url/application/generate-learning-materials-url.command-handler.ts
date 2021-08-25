import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { APPLICATION_SERVICE, ApplicationService } from '../../../shared/application/application-service';
import { LearningMaterialsUrlDomainEvent } from '../domain/events';
import { generateLearningMaterials } from '../domain/generateLearningMaterials';
import { learningMaterialsUrlEventStreamName } from '../learning-materials-url.module';
import { GenerateLearningMaterialsUrlApplicationCommand } from './api/generate-learning-materials-url.application-command';
import { LEARNING_MATERIALS_URL_GENERATOR, LearningMaterialsUrlGenerator } from './learning-materials-url-generator';

@CommandHandler(GenerateLearningMaterialsUrlApplicationCommand)
export class GenerateLearningMaterialsUrlCommandHandler
  implements ICommandHandler<GenerateLearningMaterialsUrlApplicationCommand>
{
  constructor(
    @Inject(LEARNING_MATERIALS_URL_GENERATOR)
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: GenerateLearningMaterialsUrlApplicationCommand): Promise<void> {
    const learningMaterialsUrl = await this.learningMaterialsUrlGenerator.generateUrlFor(command.data.userId);

    await this.applicationService.execute<LearningMaterialsUrlDomainEvent>(
      learningMaterialsUrlEventStreamName({ userId: command.data.userId }),
      { causationId: command.id, correlationId: command.metadata.correlationId },
      (previousEvents) => generateLearningMaterials(previousEvents, command, learningMaterialsUrl),
    );
  }
}
