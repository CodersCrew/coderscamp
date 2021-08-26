import { GenerateLearningMaterialsUrl } from '../../../shared/commands/generate-learning-materials-url.domain-command';
import { LearningMaterialsUrl } from '../application/learning-materials-url-generator';
import { LearningMaterialsUrlDomainEvent } from './events';

/**
 * Business logic in your domain is pure function. It's accept previous events, new command and return new changes - events.
 * @param pastEvents - history of the stream
 * @param command - arguments
 * @param learningMaterialsUrl - additional properties
 */
export function generateLearningMaterialsUrl(
  pastEvents: LearningMaterialsUrlDomainEvent[],
  command: GenerateLearningMaterialsUrl,
  learningMaterialsUrl: LearningMaterialsUrl,
): LearningMaterialsUrlDomainEvent[] {
  const state = pastEvents.reduce<{ generated: boolean }>(
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
