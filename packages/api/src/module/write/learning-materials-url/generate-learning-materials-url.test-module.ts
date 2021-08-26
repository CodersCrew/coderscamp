import { CommandBus } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationEvent } from '../../shared/application-command-events';
import { ApplicationEventBus } from '../shared/application/application.event-bus';
import { ApplicationCommandFactory, CommandBuilder } from '../shared/application/application-command.factory';
import { EventStreamVersion } from '../shared/application/application-service';
import { EVENT_REPOSITORY } from '../shared/application/event-repository';
import { EventStreamName } from '../shared/application/event-stream-name.valueboject';
import { ID_GENERATOR, IdGenerator } from '../shared/application/id-generator';
import { TIME_PROVIDER } from '../shared/application/time-provider.port';
import { InMemoryEventRepository } from '../shared/infrastructure/event-repository/in-memory-event-repository';
import { FixedTimeProvider } from '../shared/infrastructure/time-provider/fixed-time-provider';
import { SharedModule } from '../shared/shared.module';
import { GenerateLearningMaterialsUrlCommandHandler } from './application/generate-learning-materials-url.command-handler';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator,
  UserFullname,
} from './application/learning-materials-url-generator';
import { USERS_PORT, UsersPort } from './application/users.port';
import { PuppeteerLearningMaterialsGenerator } from './infrastructure/puppeteer-learning-materials-generator';
import { LearningMaterialsUrlRestController } from './presentation/rest/learning-materials-url.rest-controller';

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

export async function generateLearningMaterialsUrlTestModule(usersPort: UsersPort) {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());
  let generatedIds = 0;
  const mockedIdGenerator: IdGenerator = {
    generate: jest.fn().mockReturnValue(`generatedId${(generatedIds += 1)}`),
  };

  const eventRepository = new InMemoryEventRepository(testTimeProvider);

  // fixme: use imports: [LearningMaterialsUrlWriteModule] currently repeated module setup - without user
  const app: TestingModule = await Test.createTestingModule({
    imports: [
      SharedModule,
      EventEmitterModule.forRoot({
        wildcard: true,
        delimiter: '.',
        newListener: false,
        removeListener: false,
        maxListeners: 40,
        verboseMemoryLeak: false,
        ignoreErrors: false,
      }),
    ],
    controllers: [LearningMaterialsUrlRestController],
    providers: [
      {
        provide: USERS_PORT,
        useValue: usersPort,
      },
      GenerateLearningMaterialsUrlCommandHandler,
      { provide: LEARNING_MATERIALS_URL_GENERATOR, useClass: PuppeteerLearningMaterialsGenerator },
    ],
  })
    .overrideProvider(ID_GENERATOR)
    .useValue(mockedIdGenerator)
    .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
    .useValue(new MockedLearningResourcesGenerator())
    .overrideProvider(TIME_PROVIDER)
    .useValue(testTimeProvider)
    .overrideProvider(EVENT_REPOSITORY)
    .useValue(eventRepository)
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
