import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

import { isAfter } from '../utils/validators';

export class CourseBody {
  @Type(() => Date)
  @IsDate()
  dateStart: Date;

  @Type(() => Date)
  @IsDate()
  @isAfter('dateStart')
  dateEnd: Date;
}

export type Course = {
  id: string;
  dateStart: Date;
  dateEnd: Date;
};

export type GetAllCoursesResponse = Course[];

export type CreateCourseResponse = Course | null;
