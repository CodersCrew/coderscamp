import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import {
  EventsSubscription,
  PrismaTransactionManager,
} from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { SharedModule } from '@/write/shared/shared.module';

import { LearningMaterialsRestController } from './learning-materials.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [LearningMaterialsRestController],
})
export class LearningMaterialsReadModule implements OnModuleInit, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

  async onModuleInit() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('LearningMaterialsReadModel_v1')
      .onInitialPosition(this.onInitialPosition)
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

  async onInitialPosition(_position: number, context: { transaction: PrismaTransactionManager }) {
    await context.transaction.learningMaterials.deleteMany({});
  }

  async onLearningMaterialsUrlWasGenerated(
    event: ApplicationEvent<LearningMaterialsUrlWasGenerated>,
    context: { transaction: PrismaTransactionManager },
  ) {
    await context.transaction.learningMaterials.create({
      data: {
        id: event.data.learningMaterialsId,
        courseUserId: event.data.courseUserId,
        url: event.data.materialsUrl,
      },
    });
  }
}
