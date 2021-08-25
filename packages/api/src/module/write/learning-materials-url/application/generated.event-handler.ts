import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LearningMaterialsUrlWasGeneratedApplicationEvent } from './api/learning-materials-url-was-generated.application-event';

@EventsHandler({ name: 'LearningMaterialsUrlWasGenerated' })
export class GeneratedEventHandler implements IEventHandler<LearningMaterialsUrlWasGeneratedApplicationEvent> {
  handle(event: LearningMaterialsUrlWasGeneratedApplicationEvent): any {
    console.log('EVENT ', event);
  }
}
