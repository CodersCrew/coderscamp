import { UserId } from '../../../shared/core/user-id';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { userId: UserId };
};

export type LearningMaterialsCommand = GenerateLearningMaterialsUrl;
