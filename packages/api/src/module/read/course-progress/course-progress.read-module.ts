import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';
import { TaskWasUncompleted } from '@/module/events/task-was-uncompleted-event.domain-event';
import { PrismaService } from '@/prisma/prisma.service';
import { SharedModule } from '@/write/shared/shared.module';

import { CourseProgressRestController } from './course-progress.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [CourseProgressRestController],
})
export class CourseProgressReadModule {
  constructor(private readonly prismaService: PrismaService) {}

  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  async onLearningResourcesUrlWasGenerated({
    data: { learningMaterialsId, courseUserId },
  }: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    await this.prismaService.courseProgress.upsert({
      where: { learningMaterialsId },
      create: { learningMaterialsId, learningMaterialsCompletedTasks: 0, courseUserId },
      update: { courseUserId },
    });
  }

  @OnEvent('LearningMaterialsTasks.TaskWasUncompleted')
  async onTaskWasUncompleted({ data: { learningMaterialsId } }: ApplicationEvent<TaskWasUncompleted>) {
    await this.prismaService.courseProgress.upsert(
      this.courseProgressStateUpdateObject({ learningMaterialsId, increment: false }),
    );
  }

  @OnEvent('LearningMaterialsTasks.TaskWasCompleted')
  async onTaskWasCompleted({ data: { learningMaterialsId } }: ApplicationEvent<TaskWasCompleted>) {
    await this.prismaService.courseProgress.upsert(
      this.courseProgressStateUpdateObject({ learningMaterialsId, increment: true }),
    );
  }

  private courseProgressStateUpdateObject({ learningMaterialsId, increment }: GenerateCourseProgressUpsertObjectArgs) {
    return {
      where: { learningMaterialsId },
      update: {
        learningMaterialsCompletedTasks: increment ? { increment: 1 } : { decrement: 1 },
      },
      create: {
        learningMaterialsId,
        learningMaterialsCompletedTasks: increment ? 1 : 0,
      },
    };
  }
}

type GenerateCourseProgressUpsertObjectArgs = {
  learningMaterialsId: string;
  increment: boolean;
};
