import { UserId } from '../../../users/users.types';

export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { userId: UserId; materialsUrl: string };
};
