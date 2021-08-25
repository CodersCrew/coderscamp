import { AbstractApplicationEvent } from '../../../../shared/application/application-command-events';
import { LearningMaterialsUrlWasGenerated } from '../../domain/events';

export class LearningMaterialsUrlWasGeneratedApplicationEvent extends AbstractApplicationEvent<LearningMaterialsUrlWasGenerated> {}
