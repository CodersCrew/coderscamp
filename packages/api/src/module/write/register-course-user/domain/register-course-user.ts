import { RegisterCourseUser } from '@/module/commands/register-course-user';
import { CourseUserWasRegistered } from '@/module/events/course-user-was-registered.domain-event';

export function registerCourseUser(
  pastEvents: CourseUserWasRegistered[],
  { data }: RegisterCourseUser,
): CourseUserWasRegistered[] {
  const state = pastEvents.reduce<{ registered: boolean }>(
    (acc, event) => {
      switch (event.type) {
        case 'CourseUserWasRegistered': {
          return { registered: true };
        }
        default: {
          return acc;
        }
      }
    },
    { registered: false },
  );

  if (state.registered) {
    throw new Error('Course user already registered');
  }

  const newEvent: CourseUserWasRegistered = {
    type: 'CourseUserWasRegistered',
    data,
  };

  return [newEvent];
}
