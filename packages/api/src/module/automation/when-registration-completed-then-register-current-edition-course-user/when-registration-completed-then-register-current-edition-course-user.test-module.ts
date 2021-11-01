import { WhenRegistrationCompletedThenRegisterCurrentUserAutomationModule } from '@/automation/when-registration-completed-then-register-current-edition-course-user/when-registration-completed-then-register-current-edition-course-user-automation.module';
import { initAutomationTestModule } from '@/shared/test-utils';
import { ID_GENERATOR, IdGenerator } from '@/write/shared/application/id-generator';

export async function whenUserRegistrationWasCompletedThenRegisterCurrentEditionCourseUserAutomationTestModule() {
  return initAutomationTestModule([WhenRegistrationCompletedThenRegisterCurrentUserAutomationModule]);
}
