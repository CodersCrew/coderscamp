import {CommandBus, EventBus, IEvent, QueryBus} from "@nestjs/cqrs";
import {Test, TestingModule} from "@nestjs/testing"
import {LearningResourcesModule} from "./learning-resources.module";
import {GenerateLearningResources} from "./api/generate-learning-resources.command";
import {LearningResourcesWasGenerated, ResourcesUrl} from "./api/learning-resources-was-generated.event";
import {WhatAreLearningResourcesForUser} from "./api/what-are-learning-resources-for-user.query";
import {LEARNING_RESOURCES_GENERATOR, LearningResourcesGenerator} from "./core/learning-resources-generator";
import {LearningResources} from "./core/learning.resources";
import {UserId} from "../shared/user-id";
import {TIME_PROVIDER, TimeProvider} from "./core/time-provider";
import {FrozenTimeProvider} from "./infrastructure/frozen-time-provider";
import dayjs from 'dayjs'

describe("Learning Resources", () => {
  let commandBus: CommandBus;
  let eventBusSpy: EventBusSpy;
  let queryBus: QueryBus;
  let testTimeProvider: FrozenTimeProvider;

  beforeEach(async () => {
    testTimeProvider = new FrozenTimeProvider(dayjs('2018-04-04T16:00:00.000Z').toDate())
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        LearningResourcesModule
      ]
    }).overrideProvider(LEARNING_RESOURCES_GENERATOR)
      .useValue(new MockedLearningResourcesGenerator(testTimeProvider))
      .overrideProvider(TIME_PROVIDER)
      .useValue(testTimeProvider)
      .compile()
    await app.init()
    commandBus = app.get<CommandBus>(CommandBus)
    queryBus = app.get<QueryBus>(QueryBus)
    eventBusSpy = eventPublisherSpy(app)
  })

  it("when generate learning resources, then learning resources should be generated", async () => {
    //given
    const userId = "john.kovalsky"

    //when
    await commandBus.execute(new GenerateLearningResources(userId))

    //then
    const lastPublishedEvent = getLastPublishedEvent()
    expect(lastPublishedEvent).toStrictEqual(new LearningResourcesWasGenerated(userId, PROCESS_ST_URL))

    //then
    const result = await queryBus.execute(new WhatAreLearningResourcesForUser(userId))
    expect(result).toStrictEqual({resourcesUrl: PROCESS_ST_URL})
  })

  it("given resources was not generated for user, when ask what are learning resources for user, then should throw with 'Learning resources for user wasn't generated!'", async () => {
    //given
    const userId = "john.kovalsky"

    //when - then
    expect(() => queryBus.execute(new WhatAreLearningResourcesForUser(userId))).rejects.toStrictEqual(new Error('Learning resources for user wasn\'t generated!'))
  })

  it("given learning resources was generated, then generate new learning resources after at least 24 hours, then learning resources should be generated", async () => {
    //given
    const userId = "john.kovalsky"
    await commandBus.execute(new GenerateLearningResources(userId))

    //when
    testTimeProvider.timeTravelTo(dayjs('2018-04-08T16:00:00.000Z').toDate())
    await commandBus.execute(new GenerateLearningResources(userId))
    const lastPublishedEvent = getNthPublishedEvent(1)

    //then
    expect(lastPublishedEvent).toStrictEqual(new LearningResourcesWasGenerated(userId, PROCESS_ST_URL))
  })

  it("given learning resources was generated, then generate new learning resources after 20 hours, then learning resources should NOT be generated", async () => {
    //given
    const userId = "john.kovalsky"
    await commandBus.execute(new GenerateLearningResources(userId))

    //when
    testTimeProvider.timeTravelTo(dayjs('2018-04-05T12:00:00.000Z').toDate())

    expect(() => commandBus.execute(new GenerateLearningResources(userId))).rejects.toStrictEqual(new Error('You cannot generate learning resources frequently than 24 hours.'))
  })

  function getLastPublishedEvent() {
    return eventBusSpy.mock.calls[0][0];
  }

  function getNthPublishedEvent(eventOrder: number) {
    return eventBusSpy.mock.calls[eventOrder][0];
  }

})

export type EventBusSpy = jest.SpyInstance<void, [IEvent]>;

function eventPublisherSpy(app: TestingModule): EventBusSpy {
  const eventBus = app.get<EventBus>(EventBus);
  return jest.spyOn(eventBus, 'publish');
}

const PROCESS_ST_URL = "https://app.process.st/runs/CodersCampSzkolenie-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA";
class MockedLearningResourcesGenerator implements LearningResourcesGenerator{

  constructor(private readonly timeProvider: TimeProvider, private readonly alwaysReturn: ResourcesUrl = PROCESS_ST_URL) {
  }

  generateFor(userId: UserId): Promise<LearningResources> {
    const resources = new LearningResources(userId, this.alwaysReturn, this.timeProvider.currentTime())
    return Promise.resolve(resources);
  }




}
