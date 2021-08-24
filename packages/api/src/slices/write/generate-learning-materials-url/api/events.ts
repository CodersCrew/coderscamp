import { UserId } from '../../../shared/core/user-id';

export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { userId: UserId; materialsUrl: string };
};

export type LearningMaterialsDomainEvent = LearningMaterialsUrlWasGenerated;
