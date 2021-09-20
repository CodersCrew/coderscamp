import { CommandBus } from '@nestjs/cqrs';

import { commandBusNoFailWithoutHandler, initWriteTestModule } from '@/shared/test-utils';

import { WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule } from './when-email-confirmation-was-approved-then-complete-user-registration-automation.module';

export async function WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModuleAutomationTestModule() {
  return initWriteTestModule({
    modules: [WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule],
    configureModule: (app) => app.overrideProvider(CommandBus).useValue(commandBusNoFailWithoutHandler),
  });
}
