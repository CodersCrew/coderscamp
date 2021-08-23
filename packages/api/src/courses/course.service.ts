import { Injectable } from '@nestjs/common';
import type { Course } from '@prisma/client';

import { CourseBody } from '@coderscamp/shared/models/course';

import { CourseRepository } from './course.repository';
import type { CourseId } from './course.types';
// import { ICourseValidation } from './local/local.validation';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository, // private readonly validation: ICourseValidation
  ) {}

  getAll(): Promise<Course[]> {
    return this.courseRepository.findMany();
  }

  getById(id: CourseId): Promise<Course | null> {
    return this.courseRepository.findUnique({ where: { id } });
  }

  createCourse(course: CourseBody): Promise<Course> {
    // console.log('val', this.validation);

    // const validationResult = this.validation.isValid(course);

    // if (!validationResult.success) throw new Error(validationResult.errorMessage);

    return this.courseRepository.create({ data: course });
  }
}
