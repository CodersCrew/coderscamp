import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import type {
  CreateLearningMaterialResponse,
  GetLearningMaterialResponse,
} from '@coderscamp/shared/models/learning-material';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../auth/jwt/jwt-user-id.decorator';
import type { UserId } from '../users/users.types';
import { LearningMaterialsService } from './learning-materials.service';

@UseGuards(JwtAuthGuard)
@Controller('learning-materials')
export class LearningMaterialsController {
  constructor(private readonly learningMaterialsService: LearningMaterialsService) {}

  @Get()
  getLearningMaterial(@JwtUserId() userId: UserId): Promise<GetLearningMaterialResponse> {
    return this.learningMaterialsService.getLearningMaterialByUserId(userId);
  }

  @Post()
  createLearningMaterial(@JwtUserId() userId: UserId): Promise<CreateLearningMaterialResponse> {
    return this.learningMaterialsService.createLearningMaterial(userId);
  }
}
