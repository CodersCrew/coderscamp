import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationEvent } from '@/module/application-command-events';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { ApplicationCommandFactory, CommandBuilder } from '@/write/shared/application/application-command.factory';
import { EVENT_REPOSITORY } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventStreamVersion } from '@/write/shared/application/event-stream-version';
import { ID_GENERATOR, IdGenerator } from '@/write/shared/application/id-generator';
import { TIME_PROVIDER } from '@/write/shared/application/time-provider.port';
import { InMemoryEventRepository } from '@/write/shared/infrastructure/event-repository/in-memory-event-repository';
import { FixedTimeProvider } from '@/write/shared/infrastructure/time-provider/fixed-time-provider';

import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator,
  UserFullname,
} from './application/learning-materials-url-generator';
import { USERS_PORT, UsersPort } from './application/users.port';
import { AppModule } from '../../../app.module';

type EventBusSpy = jest.SpyInstance<void, [ApplicationEvent[]]>;

function getEventBusSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);

  return jest.spyOn(eventBus, 'publishAll');
}

class MockedLearningResourcesGenerator implements LearningMaterialsUrlGenerator {
  async generateUrlFor(userFullName: UserFullname): Promise<{ id: string; url: LearningMaterialsUrl }> {
    const url = `https://app.process.st/runs/${encodeURIComponent(
      userFullName ?? 'No name',
    )}-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA`;
    const id = 'sbAPITNMsl2wW6j2cg1H2A';

    return { id, url };
  }
}

export async function generateLearningMaterialsUrlTestModule(usersPort: UsersPort) {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());
  let generatedIds = 0;
  const mockedIdGenerator: IdGenerator = {
    generate: jest.fn().mockReturnValue(`generatedId${(generatedIds += 1)}`),
  };

  const eventRepository = new InMemoryEventRepository(testTimeProvider);

  // fixme: use imports: [LearningMaterialsUrlWriteModule] currently repeated module setup - without user
  const app: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ID_GENERATOR)
    .useValue(mockedIdGenerator)
    .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
    .useValue(new MockedLearningResourcesGenerator())
    .overrideProvider(TIME_PROVIDER)
    .useValue(testTimeProvider)
    .overrideProvider(EVENT_REPOSITORY)
    .useValue(eventRepository)
    .overrideProvider(USERS_PORT)
    .useValue(usersPort)
    .compile();

  await app.init();

  const commandBus = app.get<CommandBus>(CommandBus);
  const commandFactory = app.get<ApplicationCommandFactory>(ApplicationCommandFactory);
  const eventBusSpy: EventBusSpy = getEventBusSpy(app);

  function getLastPublishedEvents() {
    const lastEventIndex = eventBusSpy.mock.calls.length - 1;

    return eventBusSpy.mock.calls[lastEventIndex][0];
  }

  async function eventOccurred(
    eventStreamName: EventStreamName,
    event: ApplicationEvent,
    streamVersion: EventStreamVersion,
  ) {
    await eventRepository.write(eventStreamName, [event], streamVersion);
  }

  function timeTravelTo(time: Date) {
    testTimeProvider.travelTo(time);
  }

  async function executeCommand(builder: CommandBuilder) {
    const command = commandFactory.applicationCommand(builder);

    await commandBus.execute(command);
  }

  function currentTime() {
    return testTimeProvider.currentTime();
  }

  return {
    executeCommand,
    eventBus: eventBusSpy,
    timeTravelTo,
    getLastPublishedEvents,
    eventOccurred,
    currentTime,
  };
}
