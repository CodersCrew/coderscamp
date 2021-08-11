import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {LearningResourcesWasGenerated} from "../api/learning-resources-was-generated.event";
import {GenerateLearningResources} from "../api/generate-learning-resources.command";
import {LEARNING_RESOURCES_REPOSITORY, LearningResourcesRepository} from "./learning-resources.repository";
import { Inject } from "@nestjs/common";
import {LEARNING_RESOURCES_GENERATOR, LearningResourcesGenerator} from "./learning-resources-generator";
import dayjs from 'dayjs'
import {TIME_PROVIDER, TimeProvider} from "./time-provider.port";

@CommandHandler(GenerateLearningResources)
export class GenerateLearningResourcesCommandHandler implements ICommandHandler<GenerateLearningResources> {

  constructor(
    private readonly eventBus: EventBus,
    @Inject(LEARNING_RESOURCES_REPOSITORY) private readonly repository: LearningResourcesRepository,
    @Inject(LEARNING_RESOURCES_GENERATOR) private readonly learningResourcesGenerator: LearningResourcesGenerator,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
  ) {
  }

  async execute(command: GenerateLearningResources): Promise<void> {
    const existingLearningResources = await this.repository.findByUserId(command.userId)
    const currentTime = this.timeProvider.currentTime()
    if(existingLearningResources && dayjs(currentTime).diff(existingLearningResources.generatedAt, 'hours') < 24){
      throw new Error("You cannot generate learning resources frequently than 24 hours.")
    }

    const learningResources = await this.learningResourcesGenerator.generateFor(command.userId)
    await this.repository.save(learningResources)

    const event = new LearningResourcesWasGenerated(command.userId, learningResources.resourcesUrl)
    this.eventBus.publish(event)
  }

}
