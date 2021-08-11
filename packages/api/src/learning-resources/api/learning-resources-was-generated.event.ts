import { UserId } from '../../shared/user-id';

export type ResourcesUrl = string;

// todo: add basic event property like: eventId, occurredAt, streamId, causationId and correlationId etc.
export class LearningResourcesWasGenerated {
  constructor(readonly userId: UserId, readonly resourcesUrl: ResourcesUrl) {}
}
