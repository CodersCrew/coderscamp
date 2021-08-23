import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LearningMaterialsController } from './learning-materials.controller';
import { LearningMaterialsRepository } from './learning-materials.repository';
import { LearningMaterialsService } from './learning-materials.service';
import { WhatIsUserNameQuery } from './queries/what-is-user-name.query';

const queries = [WhatIsUserNameQuery];

@Module({
  imports: [CqrsModule],
  controllers: [LearningMaterialsController],
  providers: [LearningMaterialsService, LearningMaterialsRepository, ...queries],
})
export class LearningMaterialsModule {}
