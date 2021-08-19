import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ApplicationService } from '../../../shared/core/application-service';
import { EventStreamName } from '../../../shared/core/event-stream-name.valueboject';
import { IdGenerator } from '../../../shared/core/id-generator';
import { DomainEvent } from '../../../shared/core/slices';
import { TimeProvider } from '../../../shared/core/time-provider.port';
import { GenerateLearningMaterialsUrl } from '../api/generate-learning-materials-url.command';
import { LearningMaterialsUrlWasGenerated } from '../api/learning-materials-url-was-generated.event';
import { LearningMaterialsUrl, LearningMaterialsUrlGenerator } from './learning-materials-url-generator';

@CommandHandler(GenerateLearningMaterialsUrl)
export class GenerateLearningMaterialsUrlCommandHandler implements ICommandHandler<GenerateLearningMaterialsUrl> {
  constructor(
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
    private readonly idGenerator: IdGenerator,
    private readonly timeProvider: TimeProvider,
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: GenerateLearningMaterialsUrl): Promise<void> {
    const learningMaterialsUrl = await this.learningMaterialsUrlGenerator.generateUrlFor(command.data.userId);

    const eventStreamName = EventStreamName.from('LearningMaterialsUrl', command.data.userId);

    await this.applicationService.execute(eventStreamName, (previousEvents) =>
      this.generateLearningMaterials(previousEvents, command, learningMaterialsUrl),
    );
  }

  generateLearningMaterials(
    previousEvents: DomainEvent[],
    command: GenerateLearningMaterialsUrl,
    learningMaterialsUrl: LearningMaterialsUrl,
  ): DomainEvent[] {
    const urlAlreadyGenerated = previousEvents.reduce<boolean>(
      (acc, event) => (event instanceof LearningMaterialsUrlWasGenerated ? true : acc),
      false,
    );

    if (urlAlreadyGenerated) {
      throw new Error('Learning resources url was already generated!');
    }

    const learningMaterialsUrlWasGenerated = LearningMaterialsUrlWasGenerated.event({
      id: this.idGenerator.generate(),
      occurredAt: this.timeProvider.currentTime(),
      data: { userId: command.data.userId, materialsUrl: learningMaterialsUrl },
      metadata: { ...command.metadata, causationId: command.id },
    });

    return [learningMaterialsUrlWasGenerated];
  }
}
