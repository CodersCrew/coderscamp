import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { APPLICATION_SERVICE, ApplicationService } from '../../../shared/core/application-service';
import { EventStreamName } from '../../../shared/core/event-stream-name.valueboject';
import { LearningMaterialsDomainEvent } from '../api/events';
import { GenerateLearningMaterialsUrl } from '../api/generate-learning-materials-url.command';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator,
} from './learning-materials-url-generator';

@CommandHandler(GenerateLearningMaterialsUrl)
export class GenerateLearningMaterialsUrlCommandHandler implements ICommandHandler<GenerateLearningMaterialsUrl> {
  constructor(
    @Inject(LEARNING_MATERIALS_URL_GENERATOR)
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: GenerateLearningMaterialsUrl): Promise<void> {
    const learningMaterialsUrl = await this.learningMaterialsUrlGenerator.generateUrlFor(command.data.userId);

    const eventStreamName = EventStreamName.from('LearningMaterialsUrl', command.data.userId);

    await this.applicationService.execute<LearningMaterialsDomainEvent>(
      eventStreamName,
      { causationId: command.id, correlationId: command.metadata.correlationId },
      (previousEvents) => this.generateLearningMaterials(previousEvents, command, learningMaterialsUrl),
    );
  }

  generateLearningMaterials(
    previousEvents: LearningMaterialsDomainEvent[],
    command: GenerateLearningMaterialsUrl,
    learningMaterialsUrl: LearningMaterialsUrl,
  ): LearningMaterialsDomainEvent[] {
    const state = previousEvents.reduce<{ generated: boolean }>(
      (acc, event) => {
        switch (event.type) {
          case 'LearningMaterialsUrlWasGenerated': {
            return { generated: true };
          }
          default: {
            return acc;
          }
        }
      },
      { generated: false },
    );

    if (state.generated) {
      throw new Error('Learning resources url was already generated!');
    }

    return [
      {
        type: 'LearningMaterialsUrlWasGenerated',
        data: { userId: command.data.userId, materialsUrl: learningMaterialsUrl },
      },
    ];
  }
}

export type DomainEvent<Type = string, Data = Record<string, unknown>> = {
  type: Type;
  data: Data;
};

// domain event to integration event
// i wtedy to bylyby typy tylko type data.
// a reszta bylaby dla ich klasy! Kurde dobre...
// to sa integration event, a tamte domenowe eventy.
// domenowe eventy to wewnatrz to co maja, czy da sie typ wyliczyc? Jesli tak to mega!
// ApplicationEvent<EventType>;
// DomainEvent = ApplicationEvent['type'] / ApplicationEvent['data']
/**
 *
 @Injectable()
 export class DeserializedEventFactory {
    public createFromEvent(eventName: string, event: any): OutgoingEvent {
        event.constructor = { name: eventName };

        return Object.assign(Object.create(event), event);
    }
    public createFromEventEntities(events: Event[]): OutgoingEvent[] {
        return events.map(event =>
            this.createFromEvent(event.eventName, event.event),
        );
    }
}
 */
