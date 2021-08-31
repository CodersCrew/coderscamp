import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { GetCourseProgressResponse } from '@coderscamp/shared/models/course-progress';

import { PrismaService } from '@/prisma/prisma.service';

import { JwtAuthGuard } from '../../../crud/auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../crud/auth/jwt/jwt-user-id.decorator';
import type { UserId } from '../../../crud/users/users.types';

@UseGuards(JwtAuthGuard)
@Controller('course-progress')
export class CourseProgressRestController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getCourseProgress(@JwtUserId() courseUserId: UserId): Promise<GetCourseProgressResponse> {
    const courseProgress = await this.prismaService.courseProgress.findUnique({ where: { courseUserId } });

    if (!courseProgress) {
      throw new NotFoundException();
    }

    return {
      learningMaterials: {
        completedTasks: courseProgress.learningMaterialsCompletedTasks,
      },
    };
  }
}
