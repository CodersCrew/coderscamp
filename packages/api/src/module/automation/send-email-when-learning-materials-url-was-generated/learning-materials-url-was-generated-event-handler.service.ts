import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { PrismaTransactionContext } from '@/write/shared/application/prisma-transaction-manager/prisma-transaction-manager';

// fixme: example for automation, implement later
@Injectable()
export class LearningMaterialsUrlWasGeneratedEventHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('SendEmailWhenLearningMaterialsUrlWasGenerated_Automation_v1')
      .onEvent<LearningMaterialsUrlWasGenerated>(
        'LearningMaterialsUrlWasGenerated',
        LearningMaterialsUrlWasGeneratedEventHandler.onLearningMaterialsUrlWasGenerated,
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  private static onLearningMaterialsUrlWasGenerated(
    _context: PrismaTransactionContext,
    _event: ApplicationEvent<LearningMaterialsUrlWasGenerated>,
  ) {}
}
