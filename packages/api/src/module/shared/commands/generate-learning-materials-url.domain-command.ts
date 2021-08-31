import type { UserId } from '../../../crud/users/users.types';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { courseUserId: UserId };
};
