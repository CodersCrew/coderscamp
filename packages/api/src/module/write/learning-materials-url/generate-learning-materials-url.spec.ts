import { GenerateLearningMaterialsUrlApplicationCommand } from '../../shared/commands/generate-learning-materials-url.application-command';
import { EventStreamName } from '../shared/application/event-stream-name.valueboject';
import { generateLearningMaterialsUrlTestModule } from './generate-learning-materials-url.test-module';

describe('Generate Learning Materials URL', () => {
  it('materials were NOT generated before', async () => {
    // Given
    const testModule = await generateLearningMaterialsUrlTestModule();

    // When
    const userId = 'existing-user-id';
    const generateAt = new Date();

    testModule.timeTravelTo(generateAt);
    await testModule.executeCommand({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { userId },
    });

    // Then
    const lastPublishedEvents = await testModule.getLastPublishedEvents();

    const learningMaterialsUrlWasGenerated = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        userId,
        materialsUrl:
          'https://app.process.st/runs/existing-user-id-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 0,
      streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id'),
    };

    expect(lastPublishedEvents).toStrictEqual([learningMaterialsUrlWasGenerated]);
  });

  it('learning materials url was generated before', async () => {
    // Given
    const testModule = await generateLearningMaterialsUrlTestModule();
    const userId = 'existing-user-id';
    const generateAt = new Date();
    const learningMaterialsUrlWasGenerated = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        userId,
        materialsUrl:
          'https://app.process.st/runs/existing-user-id-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 0,
      streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id'),
    };

    await testModule.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', userId),
      learningMaterialsUrlWasGenerated,
      0,
    );

    // When

    const retryGenerateAt = new Date();

    testModule.timeTravelTo(retryGenerateAt);

    // then
    await expect(() =>
      testModule.executeCommand({
        class: GenerateLearningMaterialsUrlApplicationCommand,
        type: 'GenerateLearningMaterialsUrl',
        data: { userId },
      }),
    ).rejects.toStrictEqual(new Error('Learning resources url was already generated!'));
  });
});
