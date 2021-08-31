import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CourseBody, CreateCourseResponse, GetAllCoursesResponse } from '@coderscamp/shared/models/course';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ForAdmin, RolesGuard } from '../auth/guards';
import { CoursesService } from './courses.service';

@ForAdmin()
@UseGuards(JwtAuthGuard, RolesGuard)
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
