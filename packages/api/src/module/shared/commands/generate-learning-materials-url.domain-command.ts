import { UserId } from '../../write/shared/application/user-id';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { userId: UserId };
};
