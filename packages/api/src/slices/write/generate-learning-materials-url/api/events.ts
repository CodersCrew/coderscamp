import { LearningMaterialsUrlWasGenerated } from './learning-materials-url-was-generated.event';

type Values<T> = T[keyof T];

export const LearningMaterialsApplicationEvent = {
  LEARNING_MATERIALS_URL_WAS_GENERATED: LearningMaterialsUrlWasGenerated,
};

export type LearningMaterialsDomainEvent = Values<
  {
    [Property in keyof typeof LearningMaterialsApplicationEvent]: {
      type: Property;
      data: typeof LearningMaterialsApplicationEvent[Property]['prototype']['data'];
    };
  }
>;

// todo: A moze w druga strone? Zrobic klase, ktora zawiera event domenowy. I wtedy po prostu ta klase tworzyc z eventu!?
