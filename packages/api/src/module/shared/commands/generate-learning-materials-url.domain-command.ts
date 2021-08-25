import { UserId } from '../../write/common/application/user-id';

export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { userId: UserId };
};
