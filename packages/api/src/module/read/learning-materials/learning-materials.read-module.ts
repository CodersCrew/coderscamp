import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PrismaService } from '../../../prisma/prisma.service';
import { ApplicationEvent } from '../../shared/application-command-events';
import { LearningMaterialsUrlWasGenerated } from '../../shared/events/learning-materials-url-was-generated.domain-event';
import { SharedModule } from '../../write/shared/shared.module';

// todo: increatese completedCount on event like LearningMaterialsTaskCompleted
@Module({
  imports: [SharedModule],
})
export class LearningMaterialsReadModule {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * todo: recovering from failures - reprocessing events: Saving streamVersion in readmodel, catchup on start.
   * @param event
   */
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
