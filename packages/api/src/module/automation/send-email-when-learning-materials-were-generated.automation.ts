import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ApplicationEvent } from '../shared/application/application-command-events';
import {
  LearningMaterialsUrlWasGenerated
} from '../write/learning-materials-url/domain/events';

@Injectable()
export class SendEmailWhenLearningMaterialsWereGeneratedAutomation {
  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  handleLearningMaterialsUrlDomainEvent(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    console.log('TODO: Send Email', event);
  }
}
