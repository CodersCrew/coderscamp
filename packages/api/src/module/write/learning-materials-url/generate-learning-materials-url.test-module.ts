import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { cleanupDatabase } from '@/common/test-utils';
import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { ApplicationCommandFactory, CommandBuilder } from '@/write/shared/application/application-command.factory';
import { EVENT_REPOSITORY, EventRepository, StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventStreamVersion } from '@/write/shared/application/event-stream-version';
import { FixedTimeProvider } from '@/write/shared/infrastructure/time-provider/fixed-time-provider';

import { AppModule } from '../../../app.module';
import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrlGenerator,
} from './application/learning-materials-url-generator';
import { USERS_PORT, UsersPort } from './application/users.port';

type EventBusSpy = jest.SpyInstance<Promise<void>, [ApplicationEvent[]]>;

export type ExpectedPublishEvent<EventType extends DomainEvent> = {
  type: EventType['type'];
  data: EventType['data'];
  streamName: EventStreamName;
};

function getEventBusSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);

  return jest.spyOn(eventBus, 'publishAll');
}

export async function generateLearningMaterialsUrlTestModule() {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());

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
    .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
    .useValue(mockedLearningResourcesGenerator)
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

  function expectEvent<EventType extends DomainEvent>(actual: any, expected: ExpectedPublishEvent<EventType>) {
    expect(actual.type).toBe(expected.type);
    expect(actual.data).toStrictEqual(expected.data);
    expect(actual.streamName).toStrictEqual(expected.streamName);
  }

  function expectEventPublishedLastly<EventType extends DomainEvent>(expected: ExpectedPublishEvent<EventType>) {
    const lastPublishedEvent = getLastPublishedEvents()[0];

    expectEvent(lastPublishedEvent, expected);
  }

  function randomEventId() {
    return uuid();
  }

  async function eventOccurred(
    eventStreamName: EventStreamName,
    event: DomainEvent,
    streamVersion: EventStreamVersion,
  ) {
    const storableEvent: StorableEvent = {
      ...event,
      id: randomEventId(),
      occurredAt: testTimeProvider.currentTime(),
      metadata: { correlationId: uuid(), causationId: uuid() },
    };

    await eventRepository.write(eventStreamName, [storableEvent], streamVersion);
  }

  async function executeCommand(builder: CommandBuilder) {
    const command = commandFactory.applicationCommand(builder);

    await commandBus.execute(command);
  }

  function randomUserId() {
    return uuid();
  }

  async function close() {
    await app.close();
  }

  return {
    executeCommand,
    eventOccurred,
    randomUserId,
    randomEventId,
    close,
    expectEventPublishedLastly,
  };
}
