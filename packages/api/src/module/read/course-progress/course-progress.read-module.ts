import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';
import { TaskWasUncompleted } from '@/module/events/task-was-uncompleted-event.domain-event';
import {
  EventsSubscription,
  PrismaTransactionManager,
} from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { SharedModule } from '@/write/shared/shared.module';

import { CourseProgressRestController } from './course-progress.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [CourseProgressRestController],
})
export class CourseProgressReadModule implements OnModuleInit, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

  async onModuleInit() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('CourseProgressReadModel_v1')
      .onInitialPosition(this.onInitialPosition)
      .onEvent<LearningMaterialsUrlWasGenerated>(
        'LearningMaterialsUrlWasGenerated',
        this.onLearningMaterialsUrlWasGenerated,
      )
      .onEvent<TaskWasCompleted>('TaskWasCompleted', this.onTaskWasCompleted)
      .onEvent<TaskWasUncompleted>('TaskWasUncompleted', this.onTaskWasUncompleted)
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onInitialPosition(_position: number, context: { transaction: PrismaTransactionManager }) {
    await context.transaction.courseProgress.deleteMany({});
  }

  async onLearningMaterialsUrlWasGenerated(
    event: ApplicationEvent<LearningMaterialsUrlWasGenerated>,
    context: { transaction: PrismaTransactionManager },
  ) {
    await context.transaction.courseProgress.create({
      data: {
        courseUserId: event.data.courseUserId,
        learningMaterialsId: event.data.learningMaterialsId,
        learningMaterialsCompletedTasks: 0,
      },
    });
  }

  async onTaskWasCompleted(
    event: ApplicationEvent<TaskWasCompleted>,
    context: { transaction: PrismaTransactionManager },
  ) {
    await context.transaction.courseProgress.update({
      where: {
        learningMaterialsId: event.data.learningMaterialsId,
      },
      data: {
        learningMaterialsCompletedTasks: {
          increment: 1,
        },
      },
    });
  }

  async onTaskWasUncompleted(
    event: ApplicationEvent<TaskWasUncompleted>,
    context: { transaction: PrismaTransactionManager },
  ) {
    const where = { learningMaterialsId: event.data.learningMaterialsId };
    const courseProgress = await context.transaction.courseProgress.findUnique({ where });

    if (!courseProgress || courseProgress.learningMaterialsCompletedTasks === 0) {
      return;
    }

    await context.transaction.courseProgress.update({
      where,
      data: {
        learningMaterialsCompletedTasks: { decrement: 1 },
      },
    });
  }
}
