import { Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';

import { CoursesRepository } from './courses.repository';
import { CourseId } from './courses.types';

interface CourseData {
  dateStart: Date;
  dateEnd: Date;
}

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  getAll(): Promise<Course[]> {
    return this.coursesRepository.findMany();
  }

  getById(id: CourseId): Promise<Course | null> {
    return this.coursesRepository.findUnique({ where: { id } });
  }

  createCourse(course: CourseData): Promise<Course> {
    return this.coursesRepository.create({ data: course });
  }
}
