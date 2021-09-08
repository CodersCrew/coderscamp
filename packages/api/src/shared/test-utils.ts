import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { ApplicationCommandFactory, CommandBuilder } from '@/write/shared/application/application-command.factory';
import { EVENT_REPOSITORY, EventRepository, StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventStreamVersion } from '@/write/shared/application/event-stream-version';
import { FixedTimeProvider } from '@/write/shared/infrastructure/time-provider/fixed-time-provider';

import { AppModule } from '../app.module';

export async function cleanupDatabase(prismaService: PrismaService) {
  await Promise.all(
    Object.values(prismaService).map((table) => (table?.deleteMany ? table.deleteMany() : Promise.resolve())),
  );

  await prismaService.$executeRaw`ALTER SEQUENCE "Event_globalOrder_seq" RESTART WITH 1`;
}

export async function initReadTestModule() {
  const app = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  await app.init();

  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);
  const prismaService = app.get<PrismaService>(PrismaService);

  await cleanupDatabase(prismaService);

  async function close() {
    await app.close();
  }

  let publishedEvents = 0;

  async function eventOccurred(event: StorableEvent, streamName: EventStreamName): Promise<void> {
    publishedEvents += 1;
    await eventBus.publishAll([{ ...event, globalOrder: publishedEvents, streamVersion: publishedEvents, streamName }]);
  }

  return { prismaService, close, eventOccurred };
}

export function storableEvent<EventType extends DomainEvent>(event: EventType): StorableEvent<EventType> {
  return {
    ...event,
    id: uuid(),
    occurredAt: new Date(),
    metadata: { correlationId: uuid(), causationId: uuid() },
  };
}

export function sequence(length: number) {
  return Array.from(Array(length).keys());
}

type EventBusSpy = jest.SpyInstance<Promise<void>, [ApplicationEvent[]]>;

export type ExpectedPublishEvent<EventType extends DomainEvent> = {
  type: EventType['type'];
  data: EventType['data'];
  streamName: EventStreamName;
};

export function getEventBusSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);

  return jest.spyOn(eventBus, 'publishAll');
}

export async function initWriteTestModule(configureModule?: (app: TestingModuleBuilder) => TestingModuleBuilder) {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());

  const appBuilder: TestingModuleBuilder = await Test.createTestingModule({
    imports: [AppModule],
  });
  const app = await (configureModule ? configureModule(appBuilder) : appBuilder).compile();

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

  function expectEvent<EventType extends DomainEvent>(
    actual: ApplicationEvent,
    expected: ExpectedPublishEvent<EventType>,
  ) {
    expect({
      type: actual.type,
      data: actual.data,
      streamName: actual.streamName,
    }).toStrictEqual(expected);
  }

  function expectEventPublishedLastly<EventType extends DomainEvent>(expected: ExpectedPublishEvent<EventType>) {
    const lastPublishedEvent = getLastPublishedEvents()[0];

    expectEvent(lastPublishedEvent, expected);
  }

  function expectEventsPublishedLastly<EventType extends DomainEvent>(expectations: ExpectedPublishEvent<EventType>[]) {
    const lastPublishedEvent = getLastPublishedEvents();

    const publishedEventsForExpect = lastPublishedEvent.map((e) => ({
      type: e.type,
      data: e.data,
      streamName: e.streamName,
    }));

    expect(publishedEventsForExpect).toStrictEqual(expectations);
  }

  function randomEventId() {
    return uuid();
  }

  async function eventOccurred(
    eventStreamName: EventStreamName,
    event: DomainEvent,
    streamVersion: EventStreamVersion,
  ) {
    const eventToStore: StorableEvent = {
      ...event,
      id: randomEventId(),
      occurredAt: testTimeProvider.currentTime(),
      metadata: { correlationId: uuid(), causationId: uuid() },
    };

    await eventRepository.write(eventStreamName, [eventToStore], streamVersion);
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

  async function expectCommandPublishLastly<CommandType extends DomainEvent>(expectations: CommandType) {
    const command = jest.spyOn(commandBus, 'execute');

    // const { calls } = command.mock;

    expect(command.mock).toStrictEqual(expectations);
  }

  return {
    executeCommand,
    eventOccurred,
    randomUserId,
    randomEventId,
    close,
    expectEventPublishedLastly,
    expectCommandPublishLastly,
    expectEventsPublishedLastly,
  };
}
