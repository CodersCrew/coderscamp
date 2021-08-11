import {LearningResources} from "../core/learning.resources";
import {LearningResourcesRepository} from "../core/learning-resources.repository";
import { UserId } from "src/shared/user-id";

export class LearningResourcesInMemoryRepository implements LearningResourcesRepository {
  private readonly entities: { [id: string]: LearningResources } = {};

  findByUserId(userId: UserId): Promise<LearningResources | undefined> {
    return Promise.resolve(this.entities[userId]);
  }

  async save(learningResources: LearningResources): Promise<void> {
    this.entities[learningResources.userId] = learningResources;
  }


}
