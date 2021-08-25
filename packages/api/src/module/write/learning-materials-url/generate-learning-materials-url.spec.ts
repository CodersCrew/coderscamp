import { GenerateLearningMaterialsUrlApplicationCommand } from '../../shared/commands/generate-learning-materials-url.application-command';
import { generateLearningMaterialsUrlTestModule } from './generate-learning-materials-url.test-module';
import {EventStreamName} from "../common/application/event-stream-name.valueboject";

const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;
export function flushPromises() {
  return new Promise((res) => scheduler(res, 0));
}

describe('Generate Learning Materials URL', () => {
  it('test 1', async () => {
    // given
    const { commandBus, time, getLastPublishedEvents, commandFactory } = await generateLearningMaterialsUrlTestModule();

    // when
    const userId = 'existing-user-id';
    const generateAt = new Date();

    time.timeTravelTo(generateAt);

    const command = commandFactory.applicationCommand({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { userId },
    });

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
        metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
        streamVersion: 0,
        streamName: EventStreamName.from('LearningMaterialsUrl', 'existing-user-id')
      },
    ]);

    await flushPromises();

    // then
    await expect(() => commandBus.execute(command)).rejects.toStrictEqual(
      new Error('Learning resources url was already generated!'),
    );
    // then
    await expect(() => commandBus.execute(command)).rejects.toStrictEqual(
      new Error('Learning resources url was already generated!'),
    );
  });

  // it('test 12', async () => {
  //   // given
  //   const { commandBus, time, givenEventOccurred } = await generateLearningMaterialsUrlTestModule();
  //   const userId = 'existing-user-id'; // fixme: not uuid - cannot run with prisma
  //   const generateAt = new Date();
  //   const event = LearningMaterialsUrlWasGeneratedApplicationEvent.event({
  //     id: 'generatedId0',
  //     occurredAt: generateAt,
  //     data: {
  //       userId,
  //       materialsUrl:
  //         'https://app.process.st/runs/existing-user-id-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
  //     },
  //     metadata: { correlationId: 'correlationId', causationId: 'generateLearningMaterialsUrlCommandId' },
  //   });
  //
  //   await givenEventOccurred(EventStreamName.from('LearningMaterialsUrl', userId), event, 0);
  //
  //   // when
  //
  //   const retryGenerate = generateAt;
  //
  //   time.timeTravelTo(retryGenerate);
  //
  //   const command = GenerateLearningMaterialsUrlApplicationCommand.command({
  //     id: 'generateLearningMaterialsUrlCommandId2',
  //     issuedAt: retryGenerate,
  //     data: { userId },
  //     metadata: { correlationId: 'correlationId2' },
  //   });
  //
  //   // then
  //   await expect(() => commandBus.execute(command)).rejects.toStrictEqual(
  //     new Error('Learning resources url was already generated!'),
  //   );
  // });
});
