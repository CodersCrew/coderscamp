import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { RegisterCourseUser, RegisterCourseUserCommand } from '@/module/commands/register-course-user';
import { userRegistrationWasCompletedEvent } from '@/module/events/user-registration-was-completed.domain-event';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { whenUserRegistrationWasCompletedThenRegisterCurrentEditionCourseUserAutomationTestModule } from './when-registration-completed-then-register-current-edition-course-user.test-module';

describe('RegisterCourseUser when registrationWasCompleted', () => {
  let moduleUnderTest: AsyncReturnType<
    typeof whenUserRegistrationWasCompletedThenRegisterCurrentEditionCourseUserAutomationTestModule
  >;

  beforeEach(async () => {
    moduleUnderTest = await whenUserRegistrationWasCompletedThenRegisterCurrentEditionCourseUserAutomationTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('test', async () => {
    // Given
    // console.log('env', env);

    const courseId = process.env.CURRENT_COURSE_ID ?? '';
    // const courseUserId = moduleUnderTest.lastGeneratedId();

    const userId = 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab';
    const fullName = 'test user';
    const emailAddress = 'testUser@test.pl';
    const hashedPassword = '41c2c1fc8f6cdc15.d5ee8246071726582172f83d569287951a0d727c94dfc35e291fe17abec789c2';

    const event = userRegistrationWasCompletedEvent({ userId, fullName, emailAddress, hashedPassword });

    await moduleUnderTest.eventOccurred(EventStreamName.from('UserRegistration', userId), event);

    await moduleUnderTest.expectCommandExecutedLastly<RegisterCourseUser>({
      ...RegisterCourseUserCommand({ courseId, userId, courseUserId: moduleUnderTest.lastGeneratedId() }),
    });
  });
});
