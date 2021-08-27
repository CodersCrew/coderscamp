import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { GetLearningMaterialResponse } from '@coderscamp/shared/models/learning-material';

import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../auth/jwt/jwt-user-id.decorator';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserId } from '../../../users/users.types';

@UseGuards(JwtAuthGuard)
@Controller('learning-materials')
export class LearningMaterialsRestController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getLearningMaterial(@JwtUserId() courseUserId: UserId): Promise<GetLearningMaterialResponse> {
    const learningMaterials = await this.prismaService.learningMaterials.findUnique({ where: { courseUserId } });

    if (!learningMaterials) {
      throw new NotFoundException();
    }

    return { id: learningMaterials.id, url: learningMaterials.url };
  }
}
