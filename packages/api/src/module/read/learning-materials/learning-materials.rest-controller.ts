import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { GetLearningMaterialResponse } from '@coderscamp/shared/models/learning-material';

import { JwtUserId } from '@/crud/auth/jwt/jwt-user-id.decorator';
import { UserId } from '@/crud/users/users.types';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

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
