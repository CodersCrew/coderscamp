import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ApplicationEvent } from '../shared/application-command-events';
import {LearningMaterialsUrlWasGenerated} from "../shared/events/learning-materials-url-was-generated.domain-event";

@Injectable()
export class SendEmailWhenLearningMaterialsWereGeneratedAutomation {
  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  handleLearningMaterialsUrlDomainEvent(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    console.log('TODO: Send Email', event);
  }
}
