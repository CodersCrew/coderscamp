import {
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  CreateLearningMaterialResponse,
  GetLearningMaterialResponse,
  learningMaterialError,
} from '@coderscamp/shared/models/learning-material';

import { ResourceAlreadyExistsException, ResourceNotFoundException } from '@/common/exceptions';

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
  async createLearningMaterial(@JwtUserId() userId: UserId): Promise<CreateLearningMaterialResponse> {
    try {
      return await this.learningMaterialsService.createLearningMaterial(userId);
    } catch (ex) {
      if (ex instanceof ResourceNotFoundException) {
        throw new NotFoundException(learningMaterialError.USER_NOT_FOUND);
      }

      if (ex instanceof ResourceAlreadyExistsException) {
        throw new ConflictException(learningMaterialError.MATERIAL_ALREADY_EXISTS);
      }

      throw new InternalServerErrorException();
    }
  }
}
