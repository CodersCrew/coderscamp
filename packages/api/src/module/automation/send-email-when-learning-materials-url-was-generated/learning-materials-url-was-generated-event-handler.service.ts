import { Injectable } from '@nestjs/common';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

// fixme: example for automation, implement later
@Injectable()
export class LearningMaterialsUrlWasGeneratedEventHandler {
  private eventsSubscription: EventsSubscription;

  constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

  async onModuleInit() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('SendEmailWhenLearningMaterialsUrlWasGenerated_Automation_v1')
      .onEvent<LearningMaterialsUrlWasGenerated>(
        'LearningMaterialsUrlWasGenerated',
        this.onLearningMaterialsUrlWasGenerated,
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  onLearningMaterialsUrlWasGenerated(_event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {}
}
