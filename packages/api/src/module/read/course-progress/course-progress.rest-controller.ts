import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { GetCourseProgressResponse } from '@coderscamp/shared/models/course-progress';

import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../auth/jwt/jwt-user-id.decorator';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserId } from '../../../users/users.types';

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
