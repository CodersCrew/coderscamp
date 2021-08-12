import { UserId } from '../../shared/core/user-id';
import { LearningResourcesId } from '../core/learning-resources.model';

export type ResourcesUrl = string;

// todo: add basic event property like: eventId, streamId, causationId and correlationId etc.
export class LearningResourcesWasGenerated {
  constructor(
    readonly occurredAt: Date,
    readonly learningResourcesId: LearningResourcesId,
    readonly userId: UserId,
    readonly resourcesUrl: ResourcesUrl,
  ) {}
}
