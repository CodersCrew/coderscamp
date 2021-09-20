import { AsyncReturnType } from 'type-fest';

import { RegisterCourseUserApplicationCommand } from '@/module/commands/register-course-user';
import { CourseUserWasRegistered } from '@/module/events/course-user-was-registered.domain-event';

import { EventStreamName } from '../shared/application/event-stream-name.value-object';
import { registerCourseUserTestModule } from './register-course-user.test-module';

describe('registerCourseUserModule', () => {
  let module: AsyncReturnType<typeof registerCourseUserTestModule>;
  const commandBuilder = (userId = '', courseUserId = '', courseId = '') => ({
    class: RegisterCourseUserApplicationCommand,
    type: 'RegisterCourseUser',
    data: { userId, courseUserId, courseId },
  });

  it('should register new course user', async () => {
    // Given
    const command = commandBuilder();

    // When
    await module.executeCommand(() => command);

    // Then
    module.expectEventPublishedLastly<CourseUserWasRegistered>({
      type: 'CourseUserWasRegistered',
      data: { userId: command.data.userId, courseUserId: command.data.courseUserId, courseId: command.data.courseId },
      streamName: EventStreamName.from('CourseUser', `${command.data.courseId}_${command.data.userId}`),
    });
  });

  it('should not register new user if one already exists', async () => {
    // Given
    const command = commandBuilder();

    // When
    await module.executeCommand(() => command);

    // Then
    await expect(() => module.executeCommand(() => command)).rejects.toThrow();
  });

  beforeEach(async () => {
    module = await registerCourseUserTestModule();
  });
});
