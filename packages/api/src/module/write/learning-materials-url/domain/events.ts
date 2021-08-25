import { UserId } from '../../../shared/application/user-id';

export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { userId: UserId; materialsUrl: string };
};

export type LearningMaterialsUrlDomainEvent = LearningMaterialsUrlWasGenerated;
