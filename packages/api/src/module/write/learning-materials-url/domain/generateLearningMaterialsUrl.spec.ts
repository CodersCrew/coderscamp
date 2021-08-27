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
        courseUserId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
      },
    };
    const learningMaterialsUrl = 'https://app.process.st/runs/sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA';
    const learningMaterialsId = 'sbAPITNMsl2wW6j2cg1H2A';
    const events = generateLearningMaterialsUrl(pastEvents, command, learningMaterialsUrl, learningMaterialsId);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'LearningMaterialsUrlWasGenerated',
        data: {
          learningMaterialsId,
          courseUserId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
          materialsUrl: learningMaterialsUrl,
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
          learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
          courseUserId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
          materialsUrl: 'https://app.process.st/runs/sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
        },
      },
    ];

    // When
    const command: GenerateLearningMaterialsUrl = {
      type: 'GenerateLearningMaterialsUrl',
      data: {
        courseUserId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
      },
    };
    const learningMaterialsUrl = 'https://app.process.st/runs/sbAPITNMsl2wW6j2cg1H2A/tasks/agcdea_DS_O5B-OgtHXA';
    const learningMaterialsId = 'sbAPITNMsl2wW6j2cg1H2A';
    const domainLogic = () =>
      generateLearningMaterialsUrl(pastEvents, command, learningMaterialsUrl, learningMaterialsId);

    // Then
    expect(domainLogic).toThrow(new Error('Learning resources url was already generated!'));
  });
});
