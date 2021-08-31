import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { PrismaService } from '@/prisma/prisma.service';
import { SharedModule } from '@/write/shared/shared.module';

import { LearningMaterialsRestController } from './learning-materials.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [LearningMaterialsRestController],
})
export class LearningMaterialsReadModule {
  constructor(private readonly prismaService: PrismaService) {}

  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  async onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    await this.prismaService.learningMaterials.create({
      data: {
        id: event.data.learningMaterialsId,
        courseUserId: event.data.courseUserId,
        url: event.data.materialsUrl,
      },
    });
  }
}
