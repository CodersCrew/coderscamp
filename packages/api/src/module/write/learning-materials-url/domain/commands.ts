import { UserId } from '../../../shared/application/user-id';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { userId: UserId };
};

export type LearningMaterialsCommand = GenerateLearningMaterialsUrl;
