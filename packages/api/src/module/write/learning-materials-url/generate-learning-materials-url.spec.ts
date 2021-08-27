import { GenerateLearningMaterialsUrlApplicationCommand } from '@/commands/generate-learning-materials-url.application-command';
import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { UserId } from '@/users/users.types';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { UsersPort } from './application/users.port';
import { generateLearningMaterialsUrlTestModule } from './generate-learning-materials-url.test-module';

// fixme: cannot test with Port&Adapter - import UsersModule
describe('Generate Learning Materials URL', () => {
  const userToFullName: { [id in string]: UserId } = {
    'existing-user-id': 'Piotr Nowak',
    'another-user-id': 'Jan Kowalski',
  };
  const usersPortMock: UsersPort = {
    async getUserFullNameById(userId: UserId): Promise<string> {
      return userToFullName[userId];
    },
  };

  it('given learning materials url was NOT generated before for the user, then should be generated', async () => {
    // Given
    const testModule = await generateLearningMaterialsUrlTestModule(usersPortMock);

    // When
    const courseUserId = 'existing-user-id';
    const generateAt = new Date();

    testModule.timeTravelTo(generateAt);
    await testModule.executeCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId },
    }));

    // Then
    const lastPublishedEvents = await testModule.getLastPublishedEvents();

    const learningMaterialsUrlWasGenerated = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
        courseUserId,
        materialsUrl: 'https://app.process.st/runs/Piotr%20Nowak-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 1,
      streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id'),
    };

    expect(lastPublishedEvents).toStrictEqual([learningMaterialsUrlWasGenerated]);
  });

  it('given learning materials url was generated before for the user, then should not be generated', async () => {
    // Given
    const testModule = await generateLearningMaterialsUrlTestModule(usersPortMock);
    const courseUserId = 'existing-user-id';
    const learningMaterialsId = 'sbAPITNMsl2wW6j2cg1H2A';
    const generateAt = new Date();
    const learningMaterialsUrlWasGenerated: ApplicationEvent<LearningMaterialsUrlWasGenerated> = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        learningMaterialsId,
        courseUserId,
        materialsUrl: 'https://app.process.st/runs/Piotr%20Nowak-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 1,
      streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id'),
    };

    await testModule.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', courseUserId),
      learningMaterialsUrlWasGenerated,
      0,
    );

    // When

    const retryGenerateAt = new Date();

    testModule.timeTravelTo(retryGenerateAt);

    // Then
    await expect(() =>
      testModule.executeCommand(() => ({
        class: GenerateLearningMaterialsUrlApplicationCommand,
        type: 'GenerateLearningMaterialsUrl',
        data: { courseUserId },
      })),
    ).rejects.toStrictEqual(new Error('Learning resources url was already generated!'));
  });

  it('given learning materials url was generated before for another user, then should be generated', async () => {
    // Given
    const testModule = await generateLearningMaterialsUrlTestModule(usersPortMock);
    const anotherUserId = 'another-user-id';
    const learningMaterialsUrlWasGeneratedForAnotherUser: ApplicationEvent<LearningMaterialsUrlWasGenerated> = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'another-user-learning-materials-was-generated-event-id',
      occurredAt: testModule.currentTime(),
      data: {
        courseUserId: anotherUserId,
        learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
        materialsUrl: 'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 0,
      streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id'),
    };

    await testModule.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', anotherUserId),
      learningMaterialsUrlWasGeneratedForAnotherUser,
      0,
    );

    // When
    const userId = 'existing-user-id';
    const generateAt = new Date();

    testModule.timeTravelTo(generateAt);
    await testModule.executeCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId: userId },
    }));

    // Then
    const lastPublishedEvents = await testModule.getLastPublishedEvents();

    const learningMaterialsUrlWasGenerated: ApplicationEvent<LearningMaterialsUrlWasGenerated> = {
      type: 'LearningMaterialsUrlWasGenerated',
      id: 'generatedId1',
      occurredAt: generateAt,
      data: {
        learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
        courseUserId: userId,
        materialsUrl: 'https://app.process.st/runs/Piotr%20Nowak-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
      streamVersion: 1,
      streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id'),
    };

    expect(lastPublishedEvents).toStrictEqual([learningMaterialsUrlWasGenerated]);
  });
});
