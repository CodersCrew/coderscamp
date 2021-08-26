import { UserId } from '../../../users/users.types';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { learningMaterialsId: string; userId: UserId };
};
