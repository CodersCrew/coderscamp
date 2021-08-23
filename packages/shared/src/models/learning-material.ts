export const learningMaterialError = {
  MATERIAL_ALREADY_EXISTS: 'MATERIAL_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
};

export interface LearningMaterial {
  id: string;
  url: string;
  completedCount: number;
  userId: string;
}

export type CreateLearningMaterialResponse = LearningMaterial;

export type GetLearningMaterialResponse = LearningMaterial | null;
