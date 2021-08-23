// import { Type } from 'class-transformer';
// import { IsDate } from 'class-validator';
import { IsString } from 'class-validator';

export class CourseBody {
  // @Type(() => Date)
  // @IsDate()
  @IsString()
  dateStart: string;

  // @IsDate()
  @IsString()
  dateEnd: string;
}

export type Course = {
  id: string;
  dateStart: Date;
  dateEnd: Date;
};
export type GetAllCoursesResponse = Course[];

export type CreateCourseResponse = Course | null;
