import { WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule } from '@/automation/when-user-registration-was-started-then-request-email-confirmation/when-user-registration-was-started-then-request-email-confirmation-automation.module';
import { initAutomationTestBaseModule } from '@/shared/test-utils';

export async function whenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationTestModule() {
  return initAutomationTestBaseModule([WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule]);
}
