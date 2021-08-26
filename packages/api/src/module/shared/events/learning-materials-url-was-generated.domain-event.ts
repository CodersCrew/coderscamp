import { UserId } from '../../../users/users.types';

export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { learningMaterialsId: string; userId: UserId; materialsUrl: string };
};
