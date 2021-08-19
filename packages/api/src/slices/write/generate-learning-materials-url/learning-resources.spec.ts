// import { CommandBus, EventBus, IEvent, QueryBus } from '@nestjs/cqrs';
// import { Test, TestingModule } from '@nestjs/testing';
// import dayjs from 'dayjs';
//
// import { UserId } from '../shared/domain/user-id';
// import { GenerateLearningResources } from './api/generate-learning-resources.command';
// import { LearningResourcesWereGenerated } from './api/learning-resources-were-generated.event';
// import { WhatAreLearningResourcesForUser } from './api/what-are-learning-resources-for-user.query';
// import { ID_GENERATOR, IdGenerator } from '../shared/application/id-generator';
// import { LearningResources } from './core/learning-resources.model';
// import { LEARNING_MATERIALS_URL_GENERATOR, LearningMaterialsUrlGenerator } from '../slices/write/generate-learning-materials-url/core/learning-materials-url-generator';
// import { TIME_PROVIDER, TimeProvider } from '../shared/application/time-provider.port';
// import { USERS_FULL_NAMES, UsersFullNames } from './core/users-full-names.port';
// import { FixedTimeProvider } from '../shared/infrastructure/fixed-time-provider';
// import { UsersFullNamesInMemoryRepository } from './infrastructure/users-full-names.in-memory-repository';
// import { LearningResourcesModule } from './learning-resources.module';
//
// type EventBusSpy = jest.SpyInstance<void, [IEvent]>;
//
// function eventPublisherSpy(app: TestingModule): EventBusSpy {
//   const eventBus = app.get<EventBus>(EventBus);
//
//   return jest.spyOn(eventBus, 'publish');
// }
//
// const PROCESS_ST_URL_FOR_EXISTING_USER =
//   'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA';
//
// class MockedLearningResourcesGenerator implements LearningMaterialsUrlGenerator {
//   constructor(
//     private readonly timeProvider: TimeProvider,
//     private readonly usersFullNames: UsersFullNames,
//     private readonly idGenerator: IdGenerator,
//   ) {}
//
//   async generateUrlFor(userId: UserId): Promise<LearningResources> {
//     const user = await this.usersFullNames.findUserById(userId);
//
//     const learningResourcesId = await this.idGenerator.generate();
//
//     return new LearningResources(
//       learningResourcesId,
//       userId,
//       `https://app.process.st/runs/${encodeURIComponent(
//         user?.fullName ?? 'No name',
//       )}-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA`,
//       this.timeProvider.currentTime(),
//     );
//   }
// }
//
// /**
//  * Unit tests of main business logic without out-of-process dependencies (like database) and another modules.
//  */
// describe('Learning Resources | Module Core business logic', () => {
//   let commandBus: CommandBus;
//   let eventBusSpy: EventBusSpy;
//   let queryBus: QueryBus;
//   let testTimeProvider: FixedTimeProvider;
//   const existingUserId = '1';
//   const currentTime = dayjs('2018-04-04T16:00:00.000Z').toDate();
//
//   beforeEach(async () => {
//     testTimeProvider = new FixedTimeProvider(currentTime);
//
//     const mockedIdGenerator: IdGenerator = {
//       generate: jest
//         .fn()
//         .mockResolvedValueOnce('generatedId1')
//         .mockResolvedValueOnce('generatedId2')
//         .mockResolvedValueOnce('generatedId3'),
//     };
//
//     const usersFullNamesInMemoryRepository = new UsersFullNamesInMemoryRepository({
//       1: { fullName: 'Jan Kowalski' },
//     });
//     const app: TestingModule = await Test.createTestingModule({
//       imports: [LearningResourcesModule],
//     })
//       .overrideProvider(ID_GENERATOR)
//       .useValue(mockedIdGenerator)
//       .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
//       .useValue(
//         new MockedLearningResourcesGenerator(testTimeProvider, usersFullNamesInMemoryRepository, mockedIdGenerator),
//       )
//       .overrideProvider(TIME_PROVIDER)
//       .useValue(testTimeProvider)
//       .overrideProvider(USERS_FULL_NAMES)
//       .useValue(usersFullNamesInMemoryRepository)
//       .compile();
//
//     await app.init();
//     commandBus = app.get<CommandBus>(CommandBus);
//     queryBus = app.get<QueryBus>(QueryBus);
//     eventBusSpy = eventPublisherSpy(app);
//   });
//
//   function getLastPublishedEvent() {
//     const lastEventIndex = eventBusSpy.mock.calls.length - 1;
//
//     return eventBusSpy.mock.calls[lastEventIndex][0];
//   }
//
//   it('when generate learning resources, then learning resources should be generated', async () => {
//     // when
//     await commandBus.execute(new GenerateLearningResources(existingUserId));
//
//     // then
//     const lastPublishedEvent = getLastPublishedEvent();
//
//     expect(lastPublishedEvent).toStrictEqual(
//       new LearningResourcesWereGenerated(currentTime, 'generatedId1', existingUserId, PROCESS_ST_URL_FOR_EXISTING_USER),
//     );
//
//     // then
//     const result = await queryBus.execute(new WhatAreLearningResourcesForUser(existingUserId));
//
//     expect(result).toStrictEqual({ resourcesUrl: PROCESS_ST_URL_FOR_EXISTING_USER });
//   });
//
//   it("given resources were not generated for user, when ask what are learning resources for user, then should throw with 'Learning resources for user wasn't generated!'", async () => {
//     // when - then
//     await expect(() => queryBus.execute(new WhatAreLearningResourcesForUser(existingUserId))).rejects.toStrictEqual(
//       new Error("Learning resources for user weren't generated!"),
//     );
//   });
//
//   it('given learning resources were generated, when generate new learning resources after at least 24 hours, then learning resources should be generated', async () => {
//     // given
//     await commandBus.execute(new GenerateLearningResources(existingUserId));
//
//     // when
//     const resourcesRegeneratedAt = dayjs('2018-04-08T16:00:00.000Z').toDate();
//
//     testTimeProvider.timeTravelTo(resourcesRegeneratedAt);
//     await commandBus.execute(new GenerateLearningResources(existingUserId));
//
//     const lastPublishedEvent = getLastPublishedEvent();
//
//     // then
//     expect(lastPublishedEvent).toStrictEqual(
//       new LearningResourcesWereGenerated(
//         resourcesRegeneratedAt,
//         'generatedId2',
//         existingUserId,
//         PROCESS_ST_URL_FOR_EXISTING_USER,
//       ),
//     );
//   });
//
//   it('given learning resources were generated, when generate new learning resources after 20 hours, then learning resources should NOT be generated', async () => {
//     // given
//     await commandBus.execute(new GenerateLearningResources(existingUserId));
//
//     // when
//     const triedToGenerateResourcesAt = dayjs('2018-04-05T12:00:00.000Z').toDate();
//
//     testTimeProvider.timeTravelTo(triedToGenerateResourcesAt);
//
//     await expect(() => commandBus.execute(new GenerateLearningResources(existingUserId))).rejects.toStrictEqual(
//       new Error('You cannot generate learning resources frequently than 24 hours.'),
//     );
//   });
// });
