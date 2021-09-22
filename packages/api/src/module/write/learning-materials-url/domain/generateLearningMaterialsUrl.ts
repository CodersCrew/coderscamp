import { GenerateLearningMaterialsUrl } from '@/commands/generate-learning-materials-url.domain-command';

import { LearningMaterialsUrl } from '../application/learning-materials-url-generator';
import { LearningMaterialsUrlDomainEvent } from './events';

export function generateLearningMaterialsUrl(
  pastEvents: LearningMaterialsUrlDomainEvent[],
  command: GenerateLearningMaterialsUrl,
  learningMaterialsUrl: LearningMaterialsUrl,
  learningMaterialsId: string,
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
      data: {
        learningMaterialsId,
        courseUserId: command.data.courseUserId,
        materialsUrl: learningMaterialsUrl,
      },
    },
  ];
}
