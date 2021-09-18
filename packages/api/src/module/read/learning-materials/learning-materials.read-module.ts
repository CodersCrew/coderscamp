import { Module, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { PrismaTransactionContext } from '@/write/shared/application/prisma-transaction-manager/prisma-transaction-manager';
import { SharedModule } from '@/write/shared/shared.module';

import { LearningMaterialsRestController } from './learning-materials.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [LearningMaterialsRestController],
})
export class LearningMaterialsReadModule implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('LearningMaterials_ReadModel_v1')
      .onInitialPosition(LearningMaterialsReadModule.onInitialPosition)
      .onEvent<LearningMaterialsUrlWasGenerated>(
        'LearningMaterialsUrlWasGenerated',
        LearningMaterialsReadModule.onLearningMaterialsUrlWasGenerated,
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  private static onInitialPosition(context: PrismaTransactionContext, _position: number) {
    return context.executeWithTransaction((prisma) => prisma.learningMaterials.deleteMany({}));
  }

  private static onLearningMaterialsUrlWasGenerated(
    context: PrismaTransactionContext,
    event: ApplicationEvent<LearningMaterialsUrlWasGenerated>,
  ) {
    return context.executeWithTransaction((prisma) =>
      prisma.learningMaterials.create({
        data: {
          id: event.data.learningMaterialsId,
          courseUserId: event.data.courseUserId,
          url: event.data.materialsUrl,
        },
      }),
    );
  }
}
