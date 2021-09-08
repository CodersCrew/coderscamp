import { Abstract } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { ApplicationCommand, ApplicationEvent } from '@/module/application-command-events';
import { DomainCommand } from '@/module/domain.command';
import { DomainEvent } from '@/module/domain.event';
import { PrismaService } from '@/prisma/prisma.service';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { ApplicationCommandFactory, CommandBuilder } from '@/write/shared/application/application-command.factory';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { SubscriptionId } from '@/write/shared/application/events-subscription/events-subscription';
import { ID_GENERATOR, IdGenerator } from '@/write/shared/application/id-generator';
import { TIME_PROVIDER } from '@/write/shared/application/time-provider.port';
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

  const prismaService = app.get<PrismaService>(PrismaService);

  const applicationService = app.get<ApplicationService>(APPLICATION_SERVICE);

  await cleanupDatabase(prismaService);

  async function close() {
    await app.close();
    await cleanupDatabase(prismaService);
    await prismaService.$disconnect();
  }

  async function eventsOccurred(eventStreamName: EventStreamName, events: DomainEvent[]) {
    const sourceCommandId = uuid();

    await applicationService.execute(
      eventStreamName,
      { correlationId: sourceCommandId, causationId: sourceCommandId },
      () => events,
    );
  }

  async function eventOccurred(eventStreamName: EventStreamName, event: DomainEvent): Promise<void> {
    await eventsOccurred(eventStreamName, [event]);
  }

  function randomUuid() {
    const id = () => uuid();

    return id();
  }

  return { prismaService, close, eventOccurred, eventsOccurred, randomUuid };
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
type CommandBusSpy = jest.SpyInstance<Promise<unknown>, ICommand[]>;
type IdGeneratorSpy = jest.SpyInstance<string>;

export type ExpectedPublishEvent<EventType extends DomainEvent> = {
  type: EventType['type'];
  data: EventType['data'];
  streamName: EventStreamName;
};

export type ExpectedExecuteCommand<CommandType extends DomainCommand> = {
  type: CommandType['type'];
  data: CommandType['data'];
};

export function getEventBusSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);

  return jest.spyOn(eventBus, 'publishAll');
}
export function getCommandBusSpy(app: TestingModule): CommandBusSpy {
  const commandBus = app.get<CommandBus>(CommandBus);

  return jest.spyOn(commandBus, 'execute');
}

export function getIdGeneratorSpy(app: TestingModule): IdGeneratorSpy {
  const idGenerator = app.get<IdGenerator>(ID_GENERATOR);

  return jest.spyOn(idGenerator, 'generate');
}

export async function initWriteTestModule(
  configureModule?: TestingModuleBuilder | ((app: TestingModuleBuilder) => TestingModuleBuilder),
) {
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());

  const appBuilder: TestingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(TIME_PROVIDER)
    .useValue(testTimeProvider);
  const app = await (configureModule && !(configureModule instanceof TestingModuleBuilder)
    ? configureModule(appBuilder)
    : configureModule || appBuilder
  ).compile();

  await app.init();

  const commandBus = app.get<CommandBus>(CommandBus);
  const commandFactory = app.get<ApplicationCommandFactory>(ApplicationCommandFactory);
  const eventBusSpy: EventBusSpy = getEventBusSpy(app);
  const commandBusSpy = getCommandBusSpy(app);
  const idGeneratorSpy = getIdGeneratorSpy(app);
  const applicationService: ApplicationService = app.get<ApplicationService>(APPLICATION_SERVICE);
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

  function randomUuid() {
    return uuid();
  }

  function randomEventStreamName(): EventStreamName {
    return EventStreamName.from('RandomEventStream', uuid());
  }

  async function eventOccurred(eventStreamName: EventStreamName, event: DomainEvent) {
    const sourceCommandId = uuid();

    await applicationService.execute(
      eventStreamName,
      { correlationId: sourceCommandId, causationId: sourceCommandId },
      () => [event],
    );
  }

  async function eventsOccurred(eventStreamName: EventStreamName, events: DomainEvent[]) {
    const sourceCommandId = uuid();

    await applicationService.execute(
      eventStreamName,
      { correlationId: sourceCommandId, causationId: sourceCommandId },
      () => events,
    );
  }

  async function expectSubscriptionPosition(expectation: { subscriptionId: SubscriptionId; position: number }) {
    const subscription = () =>
      prismaService.eventsSubscription.findUnique({
        where: { id: expectation.subscriptionId },
        select: { currentPosition: true },
      });

    await waitForExpect(
      () => expect(subscription()).resolves.toStrictEqual({ currentPosition: expectation.position }),
      10000,
    );
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
    await cleanupDatabase(prismaService);
    await prismaService.$disconnect();
  }

  function get<TInput = never, TResult = TInput>(
    typeOrToken: Type<TInput> | Abstract<TInput> | string | symbol,
    options?: {
      strict: boolean;
    },
  ): TResult {
    return app.get<TInput, TResult>(typeOrToken, options);
  }

  async function expectCommandExecutedLastly<CommandType extends DomainCommand>(
    expectations: ExpectedExecuteCommand<CommandType>,
  ) {
    return waitForExpect(() => {
      const lastExecuteIndex = commandBusSpy.mock.calls.length - 1;

      const lastPublishedCommand = commandBusSpy.mock.calls[lastExecuteIndex][0] as ApplicationCommand;

      expect({
        type: lastPublishedCommand.type,
        data: lastPublishedCommand.data,
      }).toStrictEqual(expectations);
    });
  }

  function lastGeneratedId(): string {
    const ids = idGeneratorSpy.mock.results;

    return ids[ids.length - 1].value;
  }

  return {
    get,
    executeCommand,
    eventOccurred,
    eventsOccurred,
    randomUserId,
    randomEventId,
    close,
    expectEventPublishedLastly,
    expectCommandExecutedLastly,
    expectEventsPublishedLastly,
    expectSubscriptionPosition,
    randomUuid,
    randomEventStreamName,
    lastGeneratedId,
  };
}

export type SampleDomainEvent = {
  type: 'SampleDomainEvent';
  data: {
    value1: string;
    value2: number;
  };
};

export function sampleDomainEvent(
  data: SampleDomainEvent['data'] = { value1: 'sampleValue1', value2: 2 },
): SampleDomainEvent {
  return {
    type: 'SampleDomainEvent',
    data,
  };
}

export type AnotherSampleDomainEvent = {
  type: 'AnotherSampleDomainEvent';
  data: {
    value1: string;
    value2: number;
  };
};

export function anotherSampleDomainEvent(
  data: AnotherSampleDomainEvent['data'] = { value1: 'anotherSampleValue1', value2: 2 },
): AnotherSampleDomainEvent {
  return {
    type: 'AnotherSampleDomainEvent',
    data,
  };
}

export type SampleDomainEventType2 = {
  type: 'SampleDomainEventType2';
  data: {
    value1: string;
    value2: number;
  };
};

export function sampleDomainEventType2(
  data: SampleDomainEventType2['data'] = { value1: 'anotherSampleValue1', value2: 2 },
): SampleDomainEventType2 {
  return {
    type: 'SampleDomainEventType2',
    data,
  };
}
