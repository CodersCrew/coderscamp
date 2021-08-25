import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {Test, TestingModule} from '@nestjs/testing';

import {ApplicationEventBus} from '../../shared/application/application.event-bus';
import {ApplicationCommandFactory} from '../../shared/application/application-command.factory';
import {ApplicationEvent} from '../../shared/application/application-command-events';
import {EVENT_STORE} from '../../shared/application/event-repository';
import {EventStreamName} from '../../shared/application/event-stream-name.valueboject';
import {ID_GENERATOR, IdGenerator} from '../../shared/application/id-generator';
import {EventStreamVersion} from '../../shared/application/slice.types';
import {TIME_PROVIDER} from '../../shared/application/time-provider.port';
import {InMemoryEventRepository} from '../../shared/infrastructure/event-repository/in-memory-event-repository';
import {FixedTimeProvider} from '../../shared/infrastructure/time-provider/fixed-time-provider';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator,
  UserFullname,
} from './application/learning-materials-url-generator';
import {LearningMaterialsUrlModule} from './learning-materials-url.module';

type EventBusSpy = jest.SpyInstance<void, [ApplicationEvent[]]>;

function getEventBusSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);

  return jest.spyOn(eventBus, 'publishAll');
}

class MockedLearningResourcesGenerator implements LearningMaterialsUrlGenerator {
  async generateUrlFor(userFullname: UserFullname): Promise<LearningMaterialsUrl> {
    return `https://app.process.st/runs/${encodeURIComponent(
      userFullname ?? 'No name',
    )}-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA`;
  }
}

export async function generateLearningMaterialsUrlTestModule() {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());
  let generatedIds = 0;
  const mockedIdGenerator: IdGenerator = {
    generate: jest.fn().mockReturnValue(`generatedId${(generatedIds += 1)}`),
  };

  const eventRepository = new InMemoryEventRepository(testTimeProvider);
  const app: TestingModule = await Test.createTestingModule({
    imports: [LearningMaterialsUrlModule],
  })
    .overrideProvider(ID_GENERATOR)
    .useValue(mockedIdGenerator)
    .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
    .useValue(new MockedLearningResourcesGenerator())
    .overrideProvider(TIME_PROVIDER)
    .useValue(testTimeProvider)
    .overrideProvider(EVENT_STORE)
    .useValue(eventRepository)
    .compile();

  await app.init();

  const commandBus = app.get<CommandBus>(CommandBus);
  const queryBus = app.get<QueryBus>(QueryBus);
  const commandFactory = app.get<ApplicationCommandFactory>(ApplicationCommandFactory);
  const eventBusSpy: EventBusSpy = getEventBusSpy(app);

  function getLastPublishedEvents() {
    const lastEventIndex = eventBusSpy.mock.calls.length - 1;

    return eventBusSpy.mock.calls[lastEventIndex][0];
  }

  async function givenEventOccurred(
    eventStreamName: EventStreamName,
    event: ApplicationEvent,
    streamVersion: EventStreamVersion,
  ) {
    await eventRepository.write(eventStreamName, [event], streamVersion);
  }

  return {
    commandBus,
    queryBus,
    eventBus: eventBusSpy,
    time: testTimeProvider,
    getLastPublishedEvents,
    givenEventOccurred,
    commandFactory,
  };
}
