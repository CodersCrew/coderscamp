import { EventStreamName } from '../../shared/core/event-stream-name.valueboject';
import { GenerateLearningMaterialsUrl } from './api/generate-learning-materials-url.command';
import { LearningMaterialsUrlWasGenerated } from './api/learning-materials-url-was-generated.event';
import { generateLearningMaterialsUrlTestModule } from './generate-learning-materials-url.test-module';

describe('Generate Learning Materials URL', () => {
  it('test 1', async () => {
    // given
    const { commandBus, time, getLastPublishedEvents } = await generateLearningMaterialsUrlTestModule();

    // when
    const userId = 'existing-user-id';
    const generateAt = new Date();

    time.timeTravelTo(generateAt);

    const prop = {
      type: 'GenerateLearningMaterialsUrl',
      id: 'generateLearningMaterialsUrlCommandId',
      issuedAt: generateAt,
      data: { userId },
      metadata: { correlationId: 'correlationId' },
    };

    prop.constructor = { name: 'GenerateLearningMaterialsUrl' }; //todo: use types as command / event! Introduce special command / event bus for that

    const command = Object.assign(Object.create(prop), prop);

    await commandBus.execute(command);

    // then
    const lastPublishedEvents = await getLastPublishedEvents();

    expect(lastPublishedEvents).toStrictEqual([
      {
        type: 'LearningMaterialsUrlWasGenerated',
        id: 'generatedId1',
        occurredAt: generateAt,
        data: {
          userId,
          materialsUrl:
            'https://app.process.st/runs/existing-user-id-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
        },
        metadata: { correlationId: 'correlationId', causationId: 'generateLearningMaterialsUrlCommandId' },
      },
    ]);
  });

  it('test 12', async () => {
    // given
    const { commandBus, time, givenEventOccurred } = await generateLearningMaterialsUrlTestModule();
    const userId = 'existing-user-id'; // fixme: not uuid - cannot run with prisma
    const generateAt = new Date();
    const event = LearningMaterialsUrlWasGenerated.event({
      id: 'generatedId0',
      occurredAt: generateAt,
      data: {
        userId,
        materialsUrl:
          'https://app.process.st/runs/existing-user-id-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
      },
      metadata: { correlationId: 'correlationId', causationId: 'generateLearningMaterialsUrlCommandId' },
    });

    await givenEventOccurred(EventStreamName.from('LearningMaterialsUrl', userId), event, 0);

    // when

    const retryGenerate = generateAt;

    time.timeTravelTo(retryGenerate);

    const command = GenerateLearningMaterialsUrl.command({
      id: 'generateLearningMaterialsUrlCommandId2',
      issuedAt: retryGenerate,
      data: { userId },
      metadata: { correlationId: 'correlationId2' },
    });

    // then
    await expect(() => commandBus.execute(command)).rejects.toStrictEqual(
      new Error('Learning resources url was already generated!'),
    );
  });
});
