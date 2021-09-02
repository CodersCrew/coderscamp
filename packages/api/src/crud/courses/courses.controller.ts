import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CourseBody, CreateCourseResponse, GetAllCoursesResponse } from '@coderscamp/shared/models/course';

import { ForAdmin, RolesGuard } from '../../shared/guards/index';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
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
