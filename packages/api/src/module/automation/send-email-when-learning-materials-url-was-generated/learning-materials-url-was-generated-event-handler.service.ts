import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';

// fixme: example for automation, implement later
@Injectable()
export class LearningMaterialsUrlWasGeneratedEventHandler {
  @OnEvent('LearningMaterialsUrl.*')
  handleLearningMaterialsUrlDomainEvent(_event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {}
}
