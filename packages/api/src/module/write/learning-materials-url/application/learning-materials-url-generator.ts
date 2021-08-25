export const LEARNING_MATERIALS_URL_GENERATOR = Symbol('LEARNING_MATERIALS_URL_GENERATOR');
export type LearningMaterialsUrl = string;
export type UserFullname = string;
export interface LearningMaterialsUrlGenerator {
  generateUrlFor(userFullName: UserFullname): Promise<LearningMaterialsUrl>;
}
