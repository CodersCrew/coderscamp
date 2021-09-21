import {AsyncReturnType} from "type-fest";
import {emailSendingTestModule} from "@/write/email-sender/email-sending.test-module";
import {SendEmailMessageApplicationCommand} from "@/commands/send-email-message.application-command";
import {EmailMessageWasSentDomainEvent} from "@/write/email-sender/domain/events";
import {EventStreamName} from "@/write/shared/application/event-stream-name.value-object";

describe('Email sending', () => {
  let moduleUnderTest: AsyncReturnType<typeof emailSendingTestModule>;

  beforeEach(async () => {
    moduleUnderTest = await emailSendingTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('when command SendEmailMessage was executed, then EmailMessageWasSent event should be published', async() => {
    // Given
    const emailMessageId = '577e13dd-20ad-4d95-bdd9-d544c73ce358';
    const emailData = {
      emailMessageId: emailMessageId,
      to: 'test@test.com',
      subject: 'Test email',
      text: 'Welcome on board!',
      html: 'Welcome on board! HTML'
    }
    const appEmail = 'coderscamp@gmail.com';

    // When
    await moduleUnderTest.executeCommand(() => ({
      class: SendEmailMessageApplicationCommand,
      type: 'SendEmailMessage',
      data: emailData
    }))

    // Then
    await moduleUnderTest.expectEventsPublishedLastly<EmailMessageWasSentDomainEvent>([
      {
        type: 'EmailMessageWasSent',
        data: { ...emailData, from: appEmail },
        streamName: EventStreamName.from('EmailMessage',`EmailMessage_${emailMessageId}`)
      }
    ])

  })
})
