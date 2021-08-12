import { UserId } from '../../shared/core/user-id';

export type LearningResourcesId = string;
export type ResourcesUrl = string;

export class LearningResources {
  constructor(
    readonly id: LearningResourcesId,
    readonly userId: UserId,
    readonly resourcesUrl: ResourcesUrl,
    readonly generatedAt: Date,
  ) {}
}
