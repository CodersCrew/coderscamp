import { AsyncReturnType } from 'type-fest';

import { GenerateLearningMaterialsUrlApplicationCommand } from '@/commands/generate-learning-materials-url.application-command';
import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { generateLearningMaterialsUrlTestModule } from './generate-learning-materials-url.test-module';

describe('Generate Learning Materials URL', () => {
  let moduleUnderTest: AsyncReturnType<typeof generateLearningMaterialsUrlTestModule>;

  beforeEach(async () => {
    moduleUnderTest = await generateLearningMaterialsUrlTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('given learning materials url was NOT generated before for the user, then should be generated', async () => {
    // Given
    const courseUserId = moduleUnderTest.randomUserId();

    // When
    await moduleUnderTest.executeCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId },
    }));

    // Then
    await moduleUnderTest.expectEventPublishedLastly<LearningMaterialsUrlWasGenerated>({
      type: 'LearningMaterialsUrlWasGenerated',
      data: {
        learningMaterialsId: 'generatedProcessStId_1',
        courseUserId,
        materialsUrl: 'https://app.process.st/runs/generatedProcessStId_1/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      streamName: EventStreamName.from('LearningMaterialsUrl', courseUserId),
    });
  });

  it('given learning materials url was generated before for the user, then should not be generated', async () => {
    // Given
    const courseUserId = moduleUnderTest.randomUserId();
    const learningMaterialsId = 'sbAPITNMsl2wW6j2cg1H2A';
    const learningMaterialsUrlWasGenerated: LearningMaterialsUrlWasGenerated = {
      type: 'LearningMaterialsUrlWasGenerated',
      data: {
        learningMaterialsId,
        courseUserId,
        materialsUrl: 'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
    };

    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', courseUserId),
      learningMaterialsUrlWasGenerated,
      0,
    );

    // When - Then
    await expect(() =>
      moduleUnderTest.executeCommand(() => ({
        class: GenerateLearningMaterialsUrlApplicationCommand,
        type: 'GenerateLearningMaterialsUrl',
        data: { courseUserId },
      })),
    ).rejects.toStrictEqual(new Error('Learning resources url was already generated!'));
  });

  it('given learning materials url was generated before for another user, then should be generated', async () => {
    // Given
    const anotherUserId = moduleUnderTest.randomUserId();
    const learningMaterialsUrlWasGeneratedForAnotherUser: LearningMaterialsUrlWasGenerated = {
      type: 'LearningMaterialsUrlWasGenerated',
      data: {
        courseUserId: anotherUserId,
        learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
        materialsUrl: 'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
    };

    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', anotherUserId),
      learningMaterialsUrlWasGeneratedForAnotherUser,
      0,
    );

    // When
    const userId = moduleUnderTest.randomUserId();

    await moduleUnderTest.executeCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId: userId },
    }));

    // Then
    await moduleUnderTest.expectEventPublishedLastly<LearningMaterialsUrlWasGenerated>({
      type: 'LearningMaterialsUrlWasGenerated',
      data: {
        learningMaterialsId: 'generatedProcessStId_1',
        courseUserId: userId,
        materialsUrl: 'https://app.process.st/runs/generatedProcessStId_1/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      streamName: EventStreamName.from('LearningMaterialsUrl', userId),
    });
  });
});
