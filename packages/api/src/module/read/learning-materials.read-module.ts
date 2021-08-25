import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PrismaService } from '../../prisma/prisma.service';
import { ApplicationEvent } from '../write/common/application/application-command-events';
import { SharedModule } from '../write/common/shared.module';
import { LearningMaterialsUrlWasGenerated } from '../write/learning-materials-url/domain/events';

@Module({
  imports: [SharedModule],
})
export class LearningMaterialsReadModule {
  constructor(private readonly prismaService: PrismaService) {}

  //todo: recovering from failures - reprocessing events:
  // -  Saving streamVersion in readmodel.
  // - catchup on start.
  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    this.prismaService.learningMaterial.create({ data: { userId: event.data.userId, url: event.data.materialsUrl } });
  }
}

