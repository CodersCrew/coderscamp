import { WhenRegistrationCompletedThenRegisterCurrentUserAutomationModule } from '@/automation/when-registration-completed-then-register-current-edition-course-user/when-registration-completed-then-register-current-edition-course-user-automation.module';
import { initAutomationTestModule } from '@/shared/test-utils';

export async function whenUserRegistrationWasCompletedThenRegisterCurrentEditionCourseUserAutomationTestModule() {
  return initAutomationTestModule([WhenRegistrationCompletedThenRegisterCurrentUserAutomationModule]);
}
