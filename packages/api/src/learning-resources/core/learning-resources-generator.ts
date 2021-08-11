import {UserId} from "../../shared/user-id";
import {LearningResources} from "./learning.resources";

export const LEARNING_RESOURCES_GENERATOR = Symbol("LEARNING_RESOURCES_GENERATOR")
export interface LearningResourcesGenerator {

  generateFor(userId: UserId): Promise<LearningResources>

}
