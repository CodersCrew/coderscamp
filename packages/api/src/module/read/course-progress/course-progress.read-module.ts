import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PrismaService } from '../../../prisma/prisma.service';
import { ApplicationEvent } from '../../shared/application-command-events';
import { LearningMaterialsUrlWasGenerated } from '../../shared/events/learning-materials-url-was-generated.domain-event';
import { SharedModule } from '../../write/shared/shared.module';
import { CourseProgressRestController } from './course-progress.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [CourseProgressRestController],
})
export class CourseProgressReadModule {
  constructor(private readonly prismaService: PrismaService) {}

  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  async onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    await this.prismaService.courseProgress.upsert({
      create: {
        courseUserId: event.data.courseUserId,
        learningMaterialsId: event.data.learningMaterialsId,
        learningMaterialsCompletedCount: 0,
      },
      update: {
        learningMaterialsId: event.data.learningMaterialsId,
        learningMaterialsCompletedCount: 0,
      },
      where: {
        courseUserId: event.data.courseUserId,
      },
    });
  }
}
