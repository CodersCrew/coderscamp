import { WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule } from '@/automation/when-user-registration-was-started-then-request-email-confirmation/when-user-registration-was-started-then-request-email-confirmation-automation.module';
import { initAutomationTestModule } from '@/shared/test-utils';

export async function whenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationTestModule() {
  return initAutomationTestModule([WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule]);
}
