import type { UserId } from '@/crud/user-profiles/users.types';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { courseUserId: UserId };
};
