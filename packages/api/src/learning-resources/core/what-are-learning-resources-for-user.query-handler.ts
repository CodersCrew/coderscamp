import {Inject} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {WhatAreLearningResourcesForUser} from "../api/what-are-learning-resources-for-user.query";
import {LEARNING_RESOURCES_REPOSITORY, LearningResourcesRepository} from "./learning-resources.repository";

export type UserLearningResources = {
  resourcesUrl: string;
}

@QueryHandler(WhatAreLearningResourcesForUser)
export class WhatAreLearningResourcesForUserQueryHandler implements IQueryHandler<WhatAreLearningResourcesForUser> {

  constructor(@Inject(LEARNING_RESOURCES_REPOSITORY) private readonly repository: LearningResourcesRepository) {
  }

  async execute(query: WhatAreLearningResourcesForUser): Promise<UserLearningResources> {
    const found = await this.repository.findByUserId(query.userId)
    if (found?.resourcesUrl === undefined) {
      throw new Error("Learning resources for user wasn't generated!")
    }
    return {resourcesUrl: found.resourcesUrl}
  }

}
