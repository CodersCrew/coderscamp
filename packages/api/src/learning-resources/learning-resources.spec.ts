import { CommandBus, EventBus, IEvent, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import dayjs from 'dayjs';

import { UserId } from '../shared/user-id';
import { GenerateLearningResources } from './api/generate-learning-resources.command';
import { LearningResourcesWasGenerated } from './api/learning-resources-was-generated.event';
import { WhatAreLearningResourcesForUser } from './api/what-are-learning-resources-for-user.query';
import { LearningResources } from './core/learning-resources.model';
import { LEARNING_RESOURCES_GENERATOR, LearningResourcesGenerator } from './core/learning-resources-generator';
import { TIME_PROVIDER, TimeProvider } from './core/time-provider.port';
import { USERS_FULL_NAMES, UsersFullNames } from './core/users-full-names.port';
import { FixedTimeProvider } from './infrastructure/fixed-time-provider';
import { UsersFullNamesInMemoryRepository } from './infrastructure/users-full-names.in-memory-repository';
import { LearningResourcesModule } from './learning-resources.module';

type EventBusSpy = jest.SpyInstance<void, [IEvent]>;

function eventPublisherSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<EventBus>(EventBus);

  return jest.spyOn(eventBus, 'publish');
}

const PROCESS_ST_URL_FOR_EXISTING_USER =
  'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA';

class MockedLearningResourcesGenerator implements LearningResourcesGenerator {
  constructor(private readonly timeProvider: TimeProvider, private readonly usersFullNames: UsersFullNames) {}

  async generateFor(userId: UserId): Promise<LearningResources> {
    const user = await this.usersFullNames.findUserById(userId);

    return new LearningResources(
      userId,
      `https://app.process.st/runs/${encodeURIComponent(
        user?.fullName ?? 'No name',
      )}-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA`,
      this.timeProvider.currentTime(),
    );
  }
}

/**
 * Unit tests of main business logic without out-of-process dependencies (like database) and another modules.
 */
describe('Learning Resources | Module Core business logic', () => {
  let commandBus: CommandBus;
  let eventBusSpy: EventBusSpy;
  let queryBus: QueryBus;
  let testTimeProvider: FixedTimeProvider;
  const existingUserId = '1';

  beforeEach(async () => {
    testTimeProvider = new FixedTimeProvider(dayjs('2018-04-04T16:00:00.000Z').toDate());

    const usersFullNamesInMemoryRepository = new UsersFullNamesInMemoryRepository({
      1: { fullName: 'Jan Kowalski' },
    });
    const app: TestingModule = await Test.createTestingModule({
      imports: [LearningResourcesModule],
    })
      .overrideProvider(LEARNING_RESOURCES_GENERATOR)
      .useValue(new MockedLearningResourcesGenerator(testTimeProvider, usersFullNamesInMemoryRepository))
      .overrideProvider(TIME_PROVIDER)
      .useValue(testTimeProvider)
      .overrideProvider(USERS_FULL_NAMES)
      .useValue(usersFullNamesInMemoryRepository)
      .compile();

    await app.init();
    commandBus = app.get<CommandBus>(CommandBus);
    queryBus = app.get<QueryBus>(QueryBus);
    eventBusSpy = eventPublisherSpy(app);
  });

  function getLastPublishedEvent() {
    return eventBusSpy.mock.calls[0][0];
  }

  function getNthPublishedEvent(eventOrder: number) {
    return eventBusSpy.mock.calls[eventOrder][0];
  }

  it('when generate learning resources, then learning resources should be generated', async () => {
    // when
    await commandBus.execute(new GenerateLearningResources(existingUserId));

    // then
    const lastPublishedEvent = getLastPublishedEvent();

    expect(lastPublishedEvent).toStrictEqual(
      new LearningResourcesWasGenerated(existingUserId, PROCESS_ST_URL_FOR_EXISTING_USER),
    );

    // then
    const result = await queryBus.execute(new WhatAreLearningResourcesForUser(existingUserId));

    expect(result).toStrictEqual({ resourcesUrl: PROCESS_ST_URL_FOR_EXISTING_USER });
  });

  it("given resources was not generated for user, when ask what are learning resources for user, then should throw with 'Learning resources for user wasn't generated!'", async () => {
    // when - then
    await expect(() => queryBus.execute(new WhatAreLearningResourcesForUser(existingUserId))).rejects.toStrictEqual(
      new Error("Learning resources for user wasn't generated!"),
    );
  });

  it('given learning resources was generated, then generate new learning resources after at least 24 hours, then learning resources should be generated', async () => {
    // given
    await commandBus.execute(new GenerateLearningResources(existingUserId));

    // when
    testTimeProvider.timeTravelTo(dayjs('2018-04-08T16:00:00.000Z').toDate());
    await commandBus.execute(new GenerateLearningResources(existingUserId));

    const lastPublishedEvent = getNthPublishedEvent(1);

    // then
    expect(lastPublishedEvent).toStrictEqual(
      new LearningResourcesWasGenerated(existingUserId, PROCESS_ST_URL_FOR_EXISTING_USER),
    );
  });

  it('given learning resources was generated, then generate new learning resources after 20 hours, then learning resources should NOT be generated', async () => {
    // given
    await commandBus.execute(new GenerateLearningResources(existingUserId));

    // when
    testTimeProvider.timeTravelTo(dayjs('2018-04-05T12:00:00.000Z').toDate());

    await expect(() => commandBus.execute(new GenerateLearningResources(existingUserId))).rejects.toStrictEqual(
      new Error('You cannot generate learning resources frequently than 24 hours.'),
    );
  });
});
