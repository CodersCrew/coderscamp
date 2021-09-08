import { CommandBus } from '@nestjs/cqrs';

import { WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule } from '@/automation/when-user-registration-was-started-then-request-email-confirmation/when-user-registration-was-started-then-request-email-confirmation-automation.module';
import { initWriteTestModule } from '@/shared/test-utils';

export async function whenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationTestModule() {
  return initWriteTestModule([WhenUserRegistrationWasStartedThenRequestEmailConfirmationAutomationModule], (app) =>
    app.overrideProvider(CommandBus).useValue({
      register: () => {},
      execute: () => Promise.resolve(),
    }),
  );
}
