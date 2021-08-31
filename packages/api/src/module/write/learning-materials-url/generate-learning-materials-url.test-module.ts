import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { PrismaService } from '@/common/prisma/prisma.service';
import { cleanupDatabase } from '@/common/test-utils';
import { ApplicationEvent } from '@/module/application-command-events';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { ApplicationCommandFactory, CommandBuilder } from '@/write/shared/application/application-command.factory';
import { EVENT_REPOSITORY, EventRepository } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventStreamVersion } from '@/write/shared/application/event-stream-version';
import { ID_GENERATOR, IdGenerator } from '@/write/shared/application/id-generator';
import { TIME_PROVIDER } from '@/write/shared/application/time-provider.port';
import { FixedTimeProvider } from '@/write/shared/infrastructure/time-provider/fixed-time-provider';

import { AppModule } from '../../../app.module';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrlGenerator,
} from './application/learning-materials-url-generator';
import { USERS_PORT, UsersPort } from './application/users.port';

type EventBusSpy = jest.SpyInstance<void, [ApplicationEvent[]]>;

function getEventBusSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);

  return jest.spyOn(eventBus, 'publishAll');
}

export async function generateLearningMaterialsUrlTestModule() {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());
  let generatedIds = 0;
  const mockedIdGenerator: IdGenerator = {
    generate: jest.fn().mockReturnValue(`generatedId${(generatedIds += 1)}`),
  };

  let generatedUrls = 0;
  const mockedLearningResourcesGenerator: LearningMaterialsUrlGenerator = {
    generateUrlFor: jest.fn().mockImplementation(async () => {
      const id = `generatedProcessStId_${(generatedUrls += 1)}`;

      return {
        id,
        url: `https://app.process.st/runs/${id}/tasks/oFBpTVsw_DS_O5B-OgtHXA`,
      };
    }),
  };

  const mockedUsersPort: UsersPort = {
    getUserFullNameById: jest.fn().mockResolvedValue('Jan Kowalski'),
  };

  const app: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ID_GENERATOR)
    .useValue(mockedIdGenerator)
    .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
    .useValue(mockedLearningResourcesGenerator)
    .overrideProvider(TIME_PROVIDER)
    .useValue(testTimeProvider)
    .overrideProvider(USERS_PORT)
    .useValue(mockedUsersPort)
    .compile();

  await app.init();

  const commandBus = app.get<CommandBus>(CommandBus);
  const commandFactory = app.get<ApplicationCommandFactory>(ApplicationCommandFactory);
  const eventBusSpy: EventBusSpy = getEventBusSpy(app);
  const eventRepository: EventRepository = app.get<EventRepository>(EVENT_REPOSITORY);
  const prismaService = app.get<PrismaService>(PrismaService);

  await cleanupDatabase(prismaService);

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

  function randomUserId() {
    return uuid();
  }

  function randomEventId() {
    return uuid();
  }

  async function close() {
    await app.close();
  }

  return {
    executeCommand,
    eventBus: eventBusSpy,
    timeTravelTo,
    getLastPublishedEvents,
    eventOccurred,
    currentTime,
    randomUserId,
    randomEventId,
    close,
  };
}
