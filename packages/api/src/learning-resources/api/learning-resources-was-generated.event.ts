import {UserId} from "../../shared/user-id";
export type ResourcesUrl = string;

export class LearningResourcesWasGenerated {
  constructor(private readonly userId: UserId, private readonly resourcesUrl: ResourcesUrl) {
  }
}
