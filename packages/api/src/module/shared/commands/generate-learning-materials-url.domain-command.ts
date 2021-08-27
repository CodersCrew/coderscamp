import { UserId } from '../../../users/users.types';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { courseUserId: UserId };
};
