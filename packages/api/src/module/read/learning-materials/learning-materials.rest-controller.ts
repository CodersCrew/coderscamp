import { Controller, Get, UseGuards } from '@nestjs/common';

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
  getLearningMaterial(@JwtUserId() userId: UserId): Promise<GetLearningMaterialResponse> {
    return this.prismaService.learningMaterial.findUnique({ where: { userId } });
  }
}
