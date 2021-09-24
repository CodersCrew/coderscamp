import { initWriteTestModule } from '@/shared/test-utils';
import { EMAIL_SENDER, EmailMessage, EmailSender } from '@/write/email-sender/application/email-sender';
import { EmailSendingWriteModule } from '@/write/email-sender/email-sending.write-module';
import { JustLogEmailSender } from '@/write/email-sender/infrastructure/just-log.email-sender';

export async function emailSendingTestModule() {
  const module = await initWriteTestModule({
    modules: [EmailSendingWriteModule],
    configureModule: (app) => {
      return app.overrideProvider(EMAIL_SENDER).useValue(new JustLogEmailSender());
    },
  });

  const emailSender: EmailSender = module.get<EmailSender>(EMAIL_SENDER);
  const sentEmailsSpy = jest.spyOn(emailSender, 'sendAnEmail');

  function expectEmailMessageSentLastly(emailMessage: EmailMessage) {
    const lastEmailIndex = sentEmailsSpy.mock.calls.length - 1;
    const emailMessageSentLastly = sentEmailsSpy.mock.calls[lastEmailIndex][0];

    expect(emailMessageSentLastly).toStrictEqual(emailMessage);
  }

  return { ...module, expectEmailMessageSentLastly };
}
