import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { GetCourseProgressResponse } from '@coderscamp/shared/models/course-progress';

import { JwtUserId } from '@/crud/auth/jwt/jwt-user-id.decorator';
import type { UserId } from '@/crud/users/users.types';

import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { PrismaService } from '../../../shared/prisma/prisma.service';

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
