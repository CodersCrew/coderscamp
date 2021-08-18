import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import type {
  CreateLearningMaterialResponse,
  GetLearningMaterialResponse,
} from '@coderscamp/shared/models/learning-material';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserId } from '../auth/jwt/user-id.decorator';
import { LearningMaterialsService } from './learning-materials.service';

@UseGuards(JwtAuthGuard)
@Controller('learning-materials')
export class LearningMaterialsController {
  constructor(private readonly learningMaterialsService: LearningMaterialsService) {}

  @Get()
  getLearningMaterial(@UserId() userId: number): Promise<GetLearningMaterialResponse> {
    return this.learningMaterialsService.getLearningMaterialByUserId(userId);
  }

  @Post()
  createLearningMaterial(@UserId() userId: number): Promise<CreateLearningMaterialResponse> {
    return this.learningMaterialsService.createLearningMaterial(userId);
  }
}
