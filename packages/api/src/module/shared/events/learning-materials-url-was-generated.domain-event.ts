import type { UserId } from '@/crud/user-profiles/users.types';

export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { learningMaterialsId: string; courseUserId: UserId; materialsUrl: string };
};
