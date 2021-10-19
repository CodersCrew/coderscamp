import { initAutomationTestModule } from '@/shared/test-utils';

import { WhenEmailConfirmationWasRequestedThenSendEmailMessageAutomationModule } from './when-email-confirmation-was-requested-then-send-email-message-automation.module';

export async function whenEmailConfirmationWasRequestedThenSendEmailMessageAutomationTestModule() {
  return initAutomationTestModule([WhenEmailConfirmationWasRequestedThenSendEmailMessageAutomationModule]);
}
