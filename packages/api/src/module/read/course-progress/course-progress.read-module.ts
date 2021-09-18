import { Module, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';
import { TaskWasUncompleted } from '@/module/events/task-was-uncompleted-event.domain-event';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { PrismaTransactionContext } from '@/write/shared/application/prisma-transaction-manager/prisma-transaction-manager';
import { SharedModule } from '@/write/shared/shared.module';

import { CourseProgressRestController } from './course-progress.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [CourseProgressRestController],
})
export class CourseProgressReadModule implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('CourseProgress_ReadModel_v1')
      .onInitialPosition(CourseProgressReadModule.onInitialPosition)
      .onEvent<LearningMaterialsUrlWasGenerated>(
        'LearningMaterialsUrlWasGenerated',
        CourseProgressReadModule.onLearningMaterialsUrlWasGenerated,
      )
      .onEvent<TaskWasCompleted>('TaskWasCompleted', CourseProgressReadModule.onTaskWasCompleted)
      .onEvent<TaskWasUncompleted>('TaskWasUncompleted', CourseProgressReadModule.onTaskWasUncompleted)
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  private static onInitialPosition(context: PrismaTransactionContext, _position: number) {
    return context.executeWithTransaction((prisma) => prisma.courseProgress.deleteMany({}));
  }

  private static onLearningMaterialsUrlWasGenerated(
    context: PrismaTransactionContext,
    event: ApplicationEvent<LearningMaterialsUrlWasGenerated>,
  ) {
    return context.executeWithTransaction((prisma) =>
      prisma.courseProgress.upsert({
        where: { learningMaterialsId: event.data.learningMaterialsId },
        create: {
          learningMaterialsId: event.data.learningMaterialsId,
          learningMaterialsCompletedTasks: 0,
          courseUserId: event.data.courseUserId,
        },
        update: { courseUserId: event.data.courseUserId },
      }),
    );
  }

  private static onTaskWasCompleted(context: PrismaTransactionContext, event: ApplicationEvent<TaskWasCompleted>) {
    return context.executeWithTransaction((prisma) =>
      prisma.courseProgress.upsert(
        CourseProgressReadModule.courseProgressStateUpdate({
          learningMaterialsId: event.data.learningMaterialsId,
          completedTasks: 'increment',
        }),
      ),
    );
  }

  private static onTaskWasUncompleted(context: PrismaTransactionContext, event: ApplicationEvent<TaskWasUncompleted>) {
    return context.executeWithTransaction((prisma) =>
      prisma.courseProgress.upsert(
        CourseProgressReadModule.courseProgressStateUpdate({
          learningMaterialsId: event.data.learningMaterialsId,
          completedTasks: 'decrement',
        }),
      ),
    );
  }

  private static courseProgressStateUpdate({
    learningMaterialsId,
    completedTasks,
  }: {
    learningMaterialsId: string;
    completedTasks: 'increment' | 'decrement';
  }) {
    return {
      where: { learningMaterialsId },
      update: {
        learningMaterialsCompletedTasks: {
          [completedTasks]: 1,
        },
      },
      create: {
        learningMaterialsId,
        learningMaterialsCompletedTasks: completedTasks === 'increment' ? 1 : 0,
      },
    };
  }
}
