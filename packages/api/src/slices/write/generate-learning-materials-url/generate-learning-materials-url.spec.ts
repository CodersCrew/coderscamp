import { CommandBus, EventBus, IEvent, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { EVENT_STORE } from '../../shared/core/event-repository';
import { ID_GENERATOR, IdGenerator } from '../../shared/core/id-generator';
import { InMemoryEventRepository } from '../../shared/core/in-memory-event-repository';
import { TIME_PROVIDER } from '../../shared/core/time-provider.port';
import { FixedTimeProvider } from '../../shared/infrastructure/fixed-time-provider';
import { GenerateLearningMaterialsUrl } from './api/generate-learning-materials-url.command';
import { LearningMaterialsUrlWasGenerated } from './api/learning-materials-url-was-generated.event';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator,
  UserFullname,
} from './core/learning-materials-url-generator';
import { GenerateLearningMaterialsUrlModule } from './generate-learning-materials-url.module';

describe('Generate Learning Materials URL', () => {
  it('test', async () => {
    // given
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const { commandBus, time, getLastPublishedEvents } = await generateLearningMaterialsUrlTestingSlice();

    // when
    const userId = 'existing-user-id';
    const generateAt = new Date();

    time.timeTravelTo(generateAt);
    await commandBus.execute(
      GenerateLearningMaterialsUrl.command({
        id: 'generateLearningMaterialsUrlCommandId',
        issuedAt: generateAt,
        data: { userId },
        metadata: { correlationId: 'correlationId' },
      }),
    );

    // then
    const lastPublishedEvents = await getLastPublishedEvents();

    expect(lastPublishedEvents).toStrictEqual([
      LearningMaterialsUrlWasGenerated.event({
        id: 'generatedId1',
        occurredAt: generateAt,
        data: {
          userId,
          materialsUrl:
            'https://app.process.st/runs/existing-user-id-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
        },
        metadata: { correlationId: 'correlationId', causationId: 'generateLearningMaterialsUrlCommandId' },
      }),
    ]);
  });
});

type EventBusSpy = jest.SpyInstance<void, [IEvent[]]>;

function getEventBusSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<EventBus>(EventBus);

  return jest.spyOn(eventBus, 'publishAll');
}

const PROCESS_ST_URL_FOR_EXISTING_USER =
  'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA';

class MockedLearningResourcesGenerator implements LearningMaterialsUrlGenerator {
  async generateUrlFor(userFullname: UserFullname): Promise<LearningMaterialsUrl> {
    return `https://app.process.st/runs/${encodeURIComponent(
      userFullname ?? 'No name',
    )}-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA`;
  }
}

async function generateLearningMaterialsUrlTestingSlice() {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());
  let generatedIds = 0;
  const mockedIdGenerator: IdGenerator = {
    generate: jest.fn().mockReturnValue(`generatedId${(generatedIds += 1)}`),
  };

  const app: TestingModule = await Test.createTestingModule({
    imports: [GenerateLearningMaterialsUrlModule],
  })
    .overrideProvider(ID_GENERATOR)
    .useValue(mockedIdGenerator)
    .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
    .useValue(new MockedLearningResourcesGenerator())
    .overrideProvider(TIME_PROVIDER)
    .useValue(testTimeProvider)
    .overrideProvider(EVENT_STORE)
    .useValue(new InMemoryEventRepository(testTimeProvider))
    .compile();

  await app.init();

  const commandBus = app.get<CommandBus>(CommandBus);
  const queryBus = app.get<QueryBus>(QueryBus);
  const eventBusSpy: EventBusSpy = getEventBusSpy(app);

  function getLastPublishedEvents() {
    const lastEventIndex = eventBusSpy.mock.calls.length - 1;

    return eventBusSpy.mock.calls[lastEventIndex][0];
  }

  return { commandBus, queryBus, eventBus: eventBusSpy, time: testTimeProvider, getLastPublishedEvents };
}
