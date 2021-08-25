import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PrismaService } from '../../prisma/prisma.service';
import { ApplicationEvent } from '../shared/application-command-events';
import { SharedModule } from '../write/common/shared.module';
import {LearningMaterialsUrlWasGenerated} from "../shared/events/learning-materials-url-was-generated.domain-event";

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
  onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    this.prismaService.learningMaterial.create({
      data: { userId: event.data.userId, url: event.data.materialsUrl, version: event.streamVersion },
    });
  }
}
