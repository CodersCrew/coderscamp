import { Module } from '@nestjs/common';

import { env } from '@/shared/env';
import { EMAIL_SENDER } from '@/write/email-sender/application/email-sender';
import { SendEmailMessageCommandHandler } from '@/write/email-sender/application/send-email-message.command-handler';
import { JustLogEmailSender } from '@/write/email-sender/infrastructure/just-log.email-sender';
import { NodeMailerEmailSender } from '@/write/email-sender/infrastructure/node-mailer-email-sender';
import { SharedModule } from '@/write/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [
    SendEmailMessageCommandHandler,
    {
      provide: EMAIL_SENDER,
      useValue: new JustLogEmailSender(
        env.EMAIL_SENDER_TYPE === 'nodemailer'
          ? new NodeMailerEmailSender({
              host: env.NODEMAILER_HOST,
              port: env.NODEMAILER_PORT,
              auth: {
                user: env.NODEMAILER_USER,
                pass: env.NODEMAILER_PASSWORD,
              },
              secure: false,
            })
          : undefined,
      ),
    },
  ],
})
export class EmailSendingWriteModule {}
