import { AbstractApplicationCommand } from '@/module/application-command-events';

import { GenerateLearningMaterialsUrl } from './generate-learning-materials-url.domain-command';

export class GenerateLearningMaterialsUrlApplicationCommand extends AbstractApplicationCommand<GenerateLearningMaterialsUrl> {}
