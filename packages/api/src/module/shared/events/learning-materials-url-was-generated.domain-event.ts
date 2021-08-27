import type { UserId } from '@/users/users.types';

export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { learningMaterialsId: string; courseUserId: UserId; materialsUrl: string };
};
