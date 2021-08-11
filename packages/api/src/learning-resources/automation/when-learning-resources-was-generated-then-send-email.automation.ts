import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LearningResourcesWasGenerated } from '../api/learning-resources-was-generated.event';

@EventsHandler(LearningResourcesWasGenerated)
export class WhenLearningResourcesWasGeneratedThenSendEmailAutomation
  implements IEventHandler<LearningResourcesWasGenerated>
{
  handle(event: LearningResourcesWasGenerated) {
    console.log(`Send email about generated learning resources: ${event.resourcesUrl}`);
  }
}
