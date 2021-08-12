import { UserId } from '../../shared/core/user-id';
import { ResourcesUrl } from '../api/learning-resources-was-generated.event';

export type LearningResourcesId = string;
export class LearningResources {
  constructor(
    readonly id: LearningResourcesId,
    readonly userId: UserId,
    readonly resourcesUrl: ResourcesUrl,
    readonly generatedAt: Date,
  ) {}
}
