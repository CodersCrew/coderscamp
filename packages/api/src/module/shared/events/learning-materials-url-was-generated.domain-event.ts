import type { UserId } from '../../../crud/users/users.types';

export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { learningMaterialsId: string; courseUserId: UserId; materialsUrl: string };
};
