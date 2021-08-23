import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LearningMaterial } from '@prisma/client';

import { ResourceAlreadyExistsException } from '@/common/exceptions';

import type { UserId } from '../users/users.types';
import { LearningMaterialsRepository } from './learning-materials.repository';
import { generateProcessStChecklist } from './learning-materials.utils';
import { WhatIsUserNameQuery } from './queries/what-is-user-name.query';

@Injectable()
export class LearningMaterialsService {
  constructor(
    private readonly learningMaterialsRepository: LearningMaterialsRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async createLearningMaterial(userId: UserId): Promise<LearningMaterial> {
    const userName = await this.queryBus.execute(new WhatIsUserNameQuery({ id: userId }));

    const currentLearningMaterials = await this.learningMaterialsRepository.findUnique({ where: { userId } });

    if (currentLearningMaterials) {
      throw new ResourceAlreadyExistsException('Material for this user already exists');
    }

    const url = await generateProcessStChecklist(userName);

    return this.learningMaterialsRepository.create({ data: { userId, url } });
  }

  async getLearningMaterialByUserId(userId: UserId): Promise<LearningMaterial | null> {
    return this.learningMaterialsRepository.findUnique({ where: { userId } });
  }
}
