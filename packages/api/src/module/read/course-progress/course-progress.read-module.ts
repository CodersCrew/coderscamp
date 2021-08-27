import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
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
}
