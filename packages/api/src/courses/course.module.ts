import { Module } from '@nestjs/common';

import { CoursesController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
// import { CourseValidation } from './local/local.validation';

// const validators = [CourseValidation];

@Module({
  controllers: [CoursesController],
  providers: [CourseRepository, CourseService],
})
export class CourseModule {}
