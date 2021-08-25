import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { APPLICATION_SERVICE, ApplicationService } from '../../common/application/application-service';
import { EventStreamName } from '../../common/application/event-stream-name.valueboject';
import { LearningMaterialsUrlDomainEvent } from '../domain/events';
import { generateLearningMaterialsUrl } from '../domain/generateLearningMaterialsUrl';
import { GenerateLearningMaterialsUrlApplicationCommand } from './api/generate-learning-materials-url.application-command';
import { LEARNING_MATERIALS_URL_GENERATOR, LearningMaterialsUrlGenerator } from './learning-materials-url-generator';

@CommandHandler(GenerateLearningMaterialsUrlApplicationCommand)
export class GenerateLearningMaterialsUrlCommandHandler
  implements ICommandHandler<GenerateLearningMaterialsUrlApplicationCommand>
{
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
    @Inject(LEARNING_MATERIALS_URL_GENERATOR)
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
  ) {}

  async execute(command: GenerateLearningMaterialsUrlApplicationCommand): Promise<void> {
    const learningMaterialsUrl = await this.learningMaterialsUrlGenerator.generateUrlFor(command.data.userId);

    const eventStream = EventStreamName.from('LearningMaterialsUrl', command.data.userId);

    await this.applicationService.execute<LearningMaterialsUrlDomainEvent>(
      eventStream,
      { causationId: command.id, correlationId: command.metadata.correlationId },
      (previousEvents) => generateLearningMaterialsUrl(previousEvents, command, learningMaterialsUrl),
    );
  }
}
