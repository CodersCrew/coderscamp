export interface LearningMaterial {
  id: number;
  url: string;
  completedCount: number;
  userId: number;
}

export type CreateLearningMaterialResponse = LearningMaterial;

export type GetLearningMaterialResponse = LearningMaterial | null;
