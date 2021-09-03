import type { UserId } from '@/shared/domain.types';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { courseUserId: UserId };
};
