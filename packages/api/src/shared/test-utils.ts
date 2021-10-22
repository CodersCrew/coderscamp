import { INestApplication } from '@nestjs/common';
import { Abstract } from '@nestjs/common/interfaces';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { CommandBus, CqrsModule, ICommand } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import _ from 'lodash';
import { env } from 'process';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { AuthController } from '@/crud/auth/auth.controller';
import { AuthModule } from '@/crud/auth/auth.module';
import { AuthUserRepository } from '@/crud/auth/auth-user.repository';
import { JwtStrategy } from '@/crud/auth/jwt/jwt.strategy';
import { LocalStrategy } from '@/crud/auth/local/local.strategy';
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
import { PASSWORD_ENCODER } from '@/write/shared/application/password-encoder';
import { TIME_PROVIDER } from '@/write/shared/application/time-provider.port';
import { UuidGenerator } from '@/write/shared/infrastructure/id-generator/uuid-generator';
import {
  CryptoPasswordEncoder,
  hashPassword,
} from '@/write/shared/infrastructure/password-encoder/crypto-password-encoder';
import { FixedTimeProvider } from '@/write/shared/infrastructure/time-provider/fixed-time-provider';
import { SystemTimeProvider } from '@/write/shared/infrastructure/time-provider/system-time-provider';
import { SharedModule } from '@/write/shared/shared.module';

import { setupMiddlewares } from '../app.middlewares';
import { AppModule } from '../app.module';
import { eventEmitterRootModule } from '../event-emitter.root-module';
import { PrismaModule } from './prisma/prisma.module';

export async function cleanupDatabase(prismaService: PrismaService) {
  await Promise.all(
    Object.values(prismaService).map((table) => (table?.deleteMany ? table.deleteMany() : Promise.resolve())),
  );

  await prismaService.$executeRaw`ALTER SEQUENCE "Event_globalOrder_seq" RESTART WITH 1`;
}

export async function initReadTestModule(config?: { modules?: ModuleMetadata['imports'] }) {
  const app = await Test.createTestingModule({
    imports: config?.modules ? [eventEmitterRootModule, SharedModule, ...config.modules] : [AppModule],
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
  data: Partial<CommandType['data']>;
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

export async function initWriteTestModule(config?: {
  modules?: ModuleMetadata['imports'];
  configureModule?: TestingModuleBuilder | ((app: TestingModuleBuilder) => TestingModuleBuilder);
}) {
  const { modules, configureModule } = config ?? { modules: undefined, configureModule: undefined };
  const testTimeProvider: FixedTimeProvider = new FixedTimeProvider(new Date());

  const appBuilder: TestingModuleBuilder = Test.createTestingModule({
    imports: modules ? [SharedModule, eventEmitterRootModule, ...modules] : [AppModule],
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

    const sortEventsByGlobalOrderAsc = (e1: ApplicationEvent, e2: ApplicationEvent) => e1.globalOrder - e2.globalOrder;

    return eventBusSpy.mock.calls[lastEventIndex][0].sort(sortEventsByGlobalOrderAsc);
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
      }).toMatchObject(expectations);
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

export function sampleApplicationEvent(event: Partial<ApplicationEvent> = {}): ApplicationEvent {
  return {
    type: 'SampleDomainEvent',
    id: uuid(),
    occurredAt: new Date(),
    data: {},
    streamName: EventStreamName.props({ streamCategory: uuid(), streamId: uuid() }),
    streamVersion: _.random(0, 1000),
    globalOrder: _.random(0, 1000),
    metadata: {
      correlationId: uuid(),
      causationId: uuid(),
    },
    ...event,
  };
}

export const commandBusNoFailWithoutHandler: Partial<CommandBus> = {
  register: jest.fn(),
  execute: jest.fn(),
};

const strategies = [JwtStrategy, LocalStrategy];
const modules = [PrismaModule, JwtModule, AuthModule];
const services = [PrismaService, AuthUserRepository];

export async function initTestModuleRestApi(
  controller: Type,
  config?: (module: TestingModuleBuilder) => TestingModuleBuilder,
) {
  const commandBusExecute = jest.fn();
  const moduleBuilder = await Test.createTestingModule({
    providers: [
      {
        provide: CommandBus,
        useValue: { execute: commandBusExecute, register: jest.fn() },
      },
      {
        provide: ApplicationCommandFactory,
        useValue: new ApplicationCommandFactory(new UuidGenerator(), new SystemTimeProvider()),
      },
      {
        provide: PASSWORD_ENCODER,
        useClass: CryptoPasswordEncoder,
      },
      ...strategies,
      ...services,
      ...modules,
    ],
    controllers: [controller, AuthController],
    imports: [
      JwtModule.register({
        secret: env.JWT_SECRET,
        signOptions: { expiresIn: env.TOKEN_EXPIRATION_TIME },
      }),
      PassportModule,
      CqrsModule,
    ],
  });
  const moduleRef = await (config ? config(moduleBuilder) : moduleBuilder).compile();

  const app: INestApplication = moduleRef.createNestApplication();

  const prismaService = app.get<PrismaService>(PrismaService);

  setupMiddlewares(app);

  await app.init();

  const http = supertest(app.getHttpServer());

  let exampleUserCreated = false;
  let isUserLogged = false;

  const exampleAuthUser = {
    id: uuid(),
    email: 'example1@email.com',
    password: 'stronk',
    role: 'User',
  } as const;

  const addExampleUser = async () => {
    const hashedPassword = await hashPassword(exampleAuthUser.password);

    await prismaService.authUser.create({
      data: {
        ...exampleAuthUser,
        password: hashedPassword,
      },
    });

    exampleUserCreated = true;
  };

  const removeExampleUser = async () => {
    console.log(`removing user -> ${exampleAuthUser.email}`);

    await prismaService.authUser.delete({
      where: {
        email: exampleAuthUser.email,
      },
    });
    exampleUserCreated = false;
  };

  const loginUser = async () => {
    if (!exampleUserCreated) {
      await addExampleUser();
    }

    const response = await http.post('/api/auth/login').send(exampleAuthUser);

    if (response.status !== 204) {
      throw new Error('Example user login failed');
    }

    const cookie = response.get('set-cookie');

    isUserLogged = true;

    return cookie;
  };

  const logoutUser = async () => {
    const response = await http.post('/api/auth/logout').send();

    if (response.status !== 201) throw new Error('Logout user failed');

    isUserLogged = false;
  };

  async function close() {
    await app.close();

    if (isUserLogged && 5 < 4) await logoutUser();

    if (exampleUserCreated) await removeExampleUser();
  }

  return { http, close, commandBusExecute, loginUser, logoutUser, isUserLogged };
}
