import { LearningMaterialsUrl } from '../application/learning-materials-url-generator';
import { GenerateLearningMaterialsUrl } from './commands';
import { LearningMaterialsDomainEvent } from './events';

/**
 * Business logic in your domain is pure function. It's accept previous events, new command and return new changes - events.
 * @param previousEvents - history of the stream
 * @param command - arguments
 * @param learningMaterialsUrl - additional properties
 */
export function generateLearningMaterials(
  previousEvents: LearningMaterialsDomainEvent[],
  command: GenerateLearningMaterialsUrl,
  learningMaterialsUrl: LearningMaterialsUrl,
): LearningMaterialsDomainEvent[] {
  // read from previous events what you needed
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

  // validate if state is valid to execute the command
  if (state.generated) {
    throw new Error('Learning resources url was already generated!');
  }

  // return new changes
  return [
    {
      type: 'LearningMaterialsUrlWasGenerated',
      data: { userId: command.data.userId, materialsUrl: learningMaterialsUrl },
    },
  ];
}
