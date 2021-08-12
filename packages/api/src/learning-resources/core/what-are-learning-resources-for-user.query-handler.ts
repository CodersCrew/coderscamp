import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { WhatAreLearningResourcesForUser } from '../api/what-are-learning-resources-for-user.query';
import { WhatAreLearningResourcesForUserQueryResult } from '../api/what-are-learning-resources-for-user.query.result';
import { LEARNING_RESOURCES_REPOSITORY, LearningResourcesRepository } from './learning-resources.repository';

@QueryHandler(WhatAreLearningResourcesForUser)
export class WhatAreLearningResourcesForUserQueryHandler implements IQueryHandler<WhatAreLearningResourcesForUser> {
  constructor(@Inject(LEARNING_RESOURCES_REPOSITORY) private readonly repository: LearningResourcesRepository) {}

  async execute(query: WhatAreLearningResourcesForUser): Promise<WhatAreLearningResourcesForUserQueryResult> {
    const found = await this.repository.findByUserId(query.userId);

    if (found?.resourcesUrl === undefined) {
      throw new Error("Learning resources for user weren't generated!");
    }

    return { resourcesUrl: found.resourcesUrl };
  }
}
