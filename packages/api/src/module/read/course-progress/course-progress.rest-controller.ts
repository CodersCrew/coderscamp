import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { GetCourseProgressResponse } from '@coderscamp/shared/models/course-progress';

import { JwtUserId } from '@/crud/auth/jwt/jwt-user-id.decorator';
import type { UserId } from '@/crud/user-profiles/users.types';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

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
