import { initWriteTestModule } from '@/shared/test-utils';
import { EmailConfirmationWriteModule } from '@/write/email-confirmation/email-confirmation.write-module';

export async function emailConfirmationTestModule() {
  return initWriteTestModule({
    modules: [EmailConfirmationWriteModule],
  });
}
