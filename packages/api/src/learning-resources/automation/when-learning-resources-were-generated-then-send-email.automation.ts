import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LearningResourcesWereGenerated } from '../api/learning-resources-were-generated.event';

@EventsHandler(LearningResourcesWereGenerated)
export class WhenLearningResourcesWereGeneratedThenSendEmailAutomation
  implements IEventHandler<LearningResourcesWereGenerated>
{
  handle(event: LearningResourcesWereGenerated) {
    console.log(`Send email about generated learning resources: ${event.resourcesUrl}`);
  }
}
