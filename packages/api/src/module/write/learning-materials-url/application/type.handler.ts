import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { LearningMaterialsUrlDomainEvent } from '../domain/events';

@Injectable()
export class TypeHandler {
  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  handleLearningMaterialsUrlDomainEvent(event: LearningMaterialsUrlDomainEvent) {
    console.log('EVENT HANDLED', event);
  }
}
