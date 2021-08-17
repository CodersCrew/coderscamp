import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { LearningMaterial } from '@prisma/client';

import { LearningMaterialsRepository } from './learning-materials.repository';
import { generateProcessStChecklist } from './learning-materials.utils';
import { USERS_PORT, UsersPort } from './ports/users.port';

@Injectable()
export class LearningMaterialsService {
  constructor(
    private readonly learningMaterialsRepository: LearningMaterialsRepository,
    @Inject(USERS_PORT) private readonly usersPort: UsersPort,
  ) {}

  async createLearningMaterial(userId: number): Promise<LearningMaterial> {
    const userName = await this.usersPort.getUserFullNameById(userId);
    const currentLearningMaterials = await this.learningMaterialsRepository.findUnique({ where: { userId } });

    if (currentLearningMaterials) {
      throw new ConflictException('Materials for this user already exist');
    }

    const url = await generateProcessStChecklist(userName);

    return this.learningMaterialsRepository.create({ data: { userId, url } });
  }

  async getLearningMaterialByUserId(userId: number): Promise<LearningMaterial | null> {
    return this.learningMaterialsRepository.findUnique({ where: { userId } });
  }
}
