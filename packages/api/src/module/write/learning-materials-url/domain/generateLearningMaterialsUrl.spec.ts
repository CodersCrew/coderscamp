import { GenerateLearningMaterialsUrl } from '../../../shared/commands/generate-learning-materials-url.domain-command';
import { LearningMaterialsUrlDomainEvent } from './events';
import { generateLearningMaterialsUrl } from './generateLearningMaterialsUrl';

describe('generate learning materials url', () => {
  it('given not generated before, then should be generated', () => {
    // Given
    const pastEvents: LearningMaterialsUrlDomainEvent[] = [];

    // When
    const command: GenerateLearningMaterialsUrl = {
      type: 'GenerateLearningMaterialsUrl',
      data: {
        learningMaterialsId: '50fbf496-de23-4a50-9a72-7caea934f42f',
        userId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
      },
    };
    const learningMaterialsUrl =
      'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA';
    const events = generateLearningMaterialsUrl(pastEvents, command, learningMaterialsUrl);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'LearningMaterialsUrlWasGenerated',
        data: {
          learningMaterialsId: '50fbf496-de23-4a50-9a72-7caea934f42f',
          userId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
          materialsUrl:
            'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
        },
      },
    ]);
  });

  it('given was generated before, then should not be generated', () => {
    // Given
    const pastEvents: LearningMaterialsUrlDomainEvent[] = [
      {
        type: 'LearningMaterialsUrlWasGenerated',
        data: {
          learningMaterialsId: '50fbf496-de23-4a50-9a72-7caea934f42f',
          userId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
          materialsUrl:
            'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
        },
      },
    ];

    // When
    const command: GenerateLearningMaterialsUrl = {
      type: 'GenerateLearningMaterialsUrl',
      data: {
        learningMaterialsId: 'c76db1cd-809f-4014-932c-fa970b1b379e',
        userId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
      },
    };
    const learningMaterialsUrl =
      'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA';
    const domainLogic = () => generateLearningMaterialsUrl(pastEvents, command, learningMaterialsUrl);

    // Then
    expect(domainLogic).toThrow(new Error('Learning resources url was already generated!'));
  });
});
