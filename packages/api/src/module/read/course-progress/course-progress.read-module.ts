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
  async onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    await this.prismaService.courseProgress.create({
      data: {
        courseUserId: event.data.courseUserId,
        learningMaterialsId: event.data.learningMaterialsId,
        learningMaterialsCompletedTasks: 0,
      },
    });
  }

  @OnEvent('LearningMaterialsTasks.TaskWasUncompleted')
  async onTaskWasUncompleted(event: ApplicationEvent<TaskWasUncompleted>) {
    const where = { learningMaterialsId: event.data.learningMaterialsId };
    const courseProgress = await this.prismaService.courseProgress.findUnique({ where });

    if (!courseProgress || courseProgress.learningMaterialsCompletedTasks === 0) {
      return;
    }

    await this.prismaService.courseProgress.update({
      where,
      data: {
        learningMaterialsCompletedTasks: { decrement: 1 },
      },
    });
  }

  @OnEvent('LearningMaterialsTasks.TaskWasCompleted')
  async onTaskWasCompleted(event: ApplicationEvent<TaskWasCompleted>) {
    await this.prismaService.courseProgress.update({
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
}
