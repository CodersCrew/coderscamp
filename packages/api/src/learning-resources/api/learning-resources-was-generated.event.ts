import {UserId} from "../../shared/user-id";
export type ResourcesUrl = string;

export class LearningResourcesWasGenerated {
  constructor(readonly userId: UserId, readonly resourcesUrl: ResourcesUrl) {
  }
}
