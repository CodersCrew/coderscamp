import { CourseBody } from '@coderscamp/shared/models/course';

const valid = () => ({ success: true } as const);
const notValid = (errorMessage: string) => ({ success: false, errorMessage } as const);

export class CourseValidation implements ICourseValidation {
  isValid(course: CourseBody): Valid {
    if (course.dateEnd >= course.dateStart) return notValid('Data zakończenia powinna nastąpić po dacie rozoczęcia');

    return valid();
  }
}
export type ICourseValidation = Validation<CourseBody>;

type Valid = { success: true } | { success: false; errorMessage: string };

export interface Validation<TValidate> {
  isValid(object: TValidate): Valid;
}
