import { RegisterCourseUser } from '@/module/commands/register-course-user';
import { CourseUserWasRegistered } from '@/module/events/course-user-was-registered.domain-event';

import { registerCourseUser } from './register-course-user';

describe('register course user', () => {
  const command: RegisterCourseUser = {
    type: 'RegisterCourseUser',
    data: {
      userId: 'vvcwfOgoTHVrVLf4Ky5e6',
      courseUserId: 'F7IXr5vnCVWfe1oD9u7tz',
      courseId: 'iyt46Z6Mjifxmb_cZqwmb',
    },
  };

  it('should return CourseUserWasRegistered if user is not registered', () => {
    // Given
    const pastEvents: CourseUserWasRegistered[] = [];

    // When
    const events = registerCourseUser(pastEvents, command);

    // Then
    expect(events).toStrictEqual([{ type: 'CourseUserWasRegistered', data: command.data }]);
  });

  it('should throw error if user have been already registered', () => {
    // Given
    const pastEvents: CourseUserWasRegistered[] = [{ type: 'CourseUserWasRegistered', data: command.data }];

    // When
    const events = () => registerCourseUser(pastEvents, command);

    // Then
    expect(events).toThrow();
  });
});
