export interface LearningMaterial {
  id: string;
  url: string;
  courseUserId: string;
}

export type CreateLearningMaterialResponse = LearningMaterial;

export type GetLearningMaterialResponse = LearningMaterial | null;
