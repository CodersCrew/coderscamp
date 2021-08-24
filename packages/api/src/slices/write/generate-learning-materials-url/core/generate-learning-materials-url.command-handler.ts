import {Inject, Type} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { APPLICATION_SERVICE, ApplicationService } from '../../../shared/core/application-service';
import { EventStreamName } from '../../../shared/core/event-stream-name.valueboject';
import { ID_GENERATOR, IdGenerator } from '../../../shared/core/id-generator';
import {DomainCommand, DomainEvent} from '../../../shared/core/slices';
import { GenerateLearningMaterialsUrl } from '../api/generate-learning-materials-url.command';
import {
  isLearningMaterialsUrlWasGenerated,
  LearningMaterialsUrlWasGenerated,
} from '../api/learning-materials-url-was-generated.event';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator,
} from './learning-materials-url-generator';
import {plainToClass} from "class-transformer";
import {CommandBuilder} from "../presentation/rest/generate-learning-materials-url.controller";

@CommandHandler(GenerateLearningMaterialsUrl)
export class GenerateLearningMaterialsUrlCommandHandler implements ICommandHandler<GenerateLearningMaterialsUrl> {
  constructor(
    @Inject(LEARNING_MATERIALS_URL_GENERATOR)
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: GenerateLearningMaterialsUrl): Promise<void> {
    const learningMaterialsUrl = await this.learningMaterialsUrlGenerator.generateUrlFor(command.data.userId);

    const eventStreamName = EventStreamName.from('LearningMaterialsUrl', command.data.userId);

    await this.applicationService.execute(eventStreamName, (previousEvents, currentTime) =>
      this.generateLearningMaterials(previousEvents, currentTime, command, learningMaterialsUrl),
    );
  }

  generateLearningMaterials(
    previousEvents: DomainEvent[],
    currentTime: Date,
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
      occurredAt: currentTime,
      data: { userId: command.data.userId, materialsUrl: learningMaterialsUrl },
      metadata: { ...command.metadata, causationId: command.id },
    });

    return [learningMaterialsUrlWasGenerated];
  }

  // event<EventType extends DomainEvent>(builder: EventBuilder<EventType>): EventType {
  //   return plainToClass(builder.type, {
  //     id: this.idGenerator.generate(),
  //     issuedAt: this.timeProvider.currentTime(),
  //     data: builder.data,
  //     metadata: { correlationId: this.idGenerator.generate() },
  //   });
  // }
}

export type EventBuilder<EventType extends DomainEvent> = {
  type: Type<EventType>;
  data: EventType['data'];
};


//domain event to integration event
// i wtedy to bylyby typy tylko type data.
//a reszta bylaby dla ich klasy! Kurde dobre...
//to sa integration event, a tamte domenowe eventy.
//domenowe eventy to wewnatrz to co maja, czy da sie typ wyliczyc? Jesli tak to mega!

