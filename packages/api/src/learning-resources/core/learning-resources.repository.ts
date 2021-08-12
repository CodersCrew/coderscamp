import { UserId } from '../../shared/core/user-id';
import { LearningResources } from './learning-resources.model';

export const LEARNING_RESOURCES_REPOSITORY = Symbol('LearningResourcesRepository');
export interface LearningResourcesRepository {
  save(learningResources: LearningResources): Promise<void>;
  findByUserId(userId: UserId): Promise<LearningResources | undefined>;
}
