export interface LearningMaterial {
  id: string;
  url: string;
  completedCount: number;
  userId: string;
}

export type CreateLearningMaterialResponse = LearningMaterial;

export type GetLearningMaterialResponse = LearningMaterial | null;
