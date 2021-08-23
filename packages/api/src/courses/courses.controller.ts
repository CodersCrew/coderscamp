import { Body, Controller, Get, Post } from '@nestjs/common';

import { CourseBody, CreateCourseResponse, GetAllCoursesResponse } from '@coderscamp/shared/models/course';

import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getAll(): Promise<GetAllCoursesResponse> {
    return this.coursesService.getAll();
  }

  @Post()
  async createCourse(@Body() body: CourseBody): Promise<CreateCourseResponse> {
    return this.coursesService.createCourse(body);
  }
}
