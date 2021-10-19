import { initAutomationTestModule } from '@/shared/test-utils';

import { WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule } from './when-email-confirmation-was-approved-then-complete-user-registration-automation.module';

export async function WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModuleAutomationTestModule() {
  return initAutomationTestModule([WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule]);
}
