import { Unwrap } from '@coderscamp/shared/utils/lang';

import { GenerateLearningMaterialsUrlApplicationCommand } from '@/commands/generate-learning-materials-url.application-command';
import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { generateLearningMaterialsUrlTestModule } from './generate-learning-materials-url.test-module';

describe('Generate Learning Materials URL', () => {
  let moduleUnderTest: Unwrap<ReturnType<typeof generateLearningMaterialsUrlTestModule>>;

  beforeEach(async () => {
    moduleUnderTest = await generateLearningMaterialsUrlTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('given learning materials url was NOT generated before for the user, then should be generated', async () => {
    // Given
    const courseUserId = moduleUnderTest.randomUserId();
    const generateAt = new Date();

    // When
    moduleUnderTest.timeTravelTo(generateAt);
    await moduleUnderTest.executeCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId },
    }));

    // Then
    const lastPublishedEvents = await moduleUnderTest.getLastPublishedEvents();

    const learningMaterialsUrlWasGenerated = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        learningMaterialsId: 'generatedProcessStId_1',
        courseUserId,
        materialsUrl: 'https://app.process.st/runs/generatedProcessStId_1/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 1,
      streamName: EventStreamName.from('LearningMaterialsUrl', courseUserId),
    };

    expect(lastPublishedEvents).toStrictEqual([learningMaterialsUrlWasGenerated]);
  });

  it('given learning materials url was generated before for the user, then should not be generated', async () => {
    // Given
    const courseUserId = moduleUnderTest.randomUserId();
    const learningMaterialsId = 'sbAPITNMsl2wW6j2cg1H2A';
    const generateAt = new Date();
    const learningMaterialsUrlWasGenerated: ApplicationEvent<LearningMaterialsUrlWasGenerated> = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        learningMaterialsId,
        courseUserId,
        materialsUrl: 'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 1,
      streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id'),
    };

    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', courseUserId),
      learningMaterialsUrlWasGenerated,
      0,
    );

    // When
    const retryGenerateAt = new Date();

    moduleUnderTest.timeTravelTo(retryGenerateAt);

    // Then
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
    const learningMaterialsUrlWasGeneratedForAnotherUser: ApplicationEvent<LearningMaterialsUrlWasGenerated> = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'another-user-learning-materials-was-generated-event-id',
      occurredAt: moduleUnderTest.currentTime(),
      data: {
        courseUserId: anotherUserId,
        learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
        materialsUrl: 'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 0,
      streamName: EventStreamName.from('LearningMaterialsUrl', anotherUserId),
    };

    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', anotherUserId),
      learningMaterialsUrlWasGeneratedForAnotherUser,
      0,
    );

    // When
    const userId = moduleUnderTest.randomUserId();
    const generateAt = new Date();

    moduleUnderTest.timeTravelTo(generateAt);
    await moduleUnderTest.executeCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId: userId },
    }));

    // Then
    const lastPublishedEvents = await moduleUnderTest.getLastPublishedEvents();

    const learningMaterialsUrlWasGenerated: ApplicationEvent<LearningMaterialsUrlWasGenerated> = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        learningMaterialsId: 'generatedProcessStId_1',
        courseUserId: userId,
        materialsUrl: 'https://app.process.st/runs/generatedProcessStId_1/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 1,
      streamName: EventStreamName.from('LearningMaterialsUrl', userId),
    };

    expect(lastPublishedEvents).toStrictEqual([learningMaterialsUrlWasGenerated]);
  });
});
