import { Body, Controller, Get, Post } from '@nestjs/common';

import type { CourseBody, CreateCourseResponse, GetAllCoursesResponse } from '@coderscamp/shared/models/course';

// import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CourseService } from './course.service';

// @UseGuards(JwtAuthGuard)
@Controller('course')
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  async getAll(): Promise<GetAllCoursesResponse> {
    return this.courseService.getAll();
  }

  @Post()
  async createCourse(@Body() body: CourseBody): Promise<CreateCourseResponse> {
    console.log('body', { bb: body });

    // const data: CourseBody = {
    //   dateStart: new Date('2017-01-01'),
    //   dateEnd: new Date('2017-02-01'),
    // };

    return this.courseService.createCourse(body);
  }
}
