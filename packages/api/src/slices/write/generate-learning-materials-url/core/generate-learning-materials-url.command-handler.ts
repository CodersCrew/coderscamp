import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {APPLICATION_SERVICE, ApplicationService} from '../../../shared/core/application-service';
import { EventStreamName } from '../../../shared/core/event-stream-name.valueboject';
import {ID_GENERATOR, IdGenerator} from '../../../shared/core/id-generator';
import { DomainEvent } from '../../../shared/core/slices';
import {TIME_PROVIDER, TimeProvider} from '../../../shared/core/time-provider.port';
import { GenerateLearningMaterialsUrl } from '../api/generate-learning-materials-url.command';
import {
  isLearningMaterialsUrlWasGenerated,
  LearningMaterialsUrlWasGenerated,
} from '../api/learning-materials-url-was-generated.event';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator
} from './learning-materials-url-generator';
import {Inject} from "@nestjs/common";

@CommandHandler(GenerateLearningMaterialsUrl)
export class GenerateLearningMaterialsUrlCommandHandler implements ICommandHandler<GenerateLearningMaterialsUrl> {
  constructor(
    @Inject(LEARNING_MATERIALS_URL_GENERATOR)
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
    @Inject(TIME_PROVIDER)
    private readonly timeProvider: TimeProvider,
    @Inject(APPLICATION_SERVICE)
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
    const state = previousEvents.reduce<{ generated: boolean }>(
      (acc, event) => (isLearningMaterialsUrlWasGenerated(event) ? { generated: true } : acc),
      { generated: false },
    );

    if (state.generated) {
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
