import { initAutomationTestModule } from '@/shared/test-utils';
import { ID_GENERATOR, IdGenerator } from '@/write/shared/application/id-generator';

import { WhenEmailConfirmationWasRequestedThenSendEmailMessageAutomationModule } from './when-email-confirmation-was-requested-then-send-email-message-automation.module';

class FakeIdGenerator implements IdGenerator {
  generate(): string {
    return '12345';
  }
}

// class FakeIdGenerator implements PrismaService {
//   generate(): string {
//     return '12345';
//   }
// }

export async function whenEmailConfirmationWasRequestedThenSendEmailMessageAutomationTestModule() {
  return initAutomationTestModule({
    modules: [WhenEmailConfirmationWasRequestedThenSendEmailMessageAutomationModule],
    configureModule: (app) => app.overrideProvider(ID_GENERATOR).useClass(FakeIdGenerator),
  });
}
