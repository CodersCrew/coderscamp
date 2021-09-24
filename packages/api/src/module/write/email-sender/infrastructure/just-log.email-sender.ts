import { Logger } from '@nestjs/common';

import { EmailMessage, EmailSender } from '@/write/email-sender/application/email-sender';

const logger = new Logger('JustLogEmailSender');

export class JustLogEmailSender implements EmailSender {
  constructor(private readonly next?: EmailSender) {}

  async sendAnEmail(message: EmailMessage): Promise<void> {
    this.next?.sendAnEmail(message);
    logger.log('Email message was sent: ', message);
  }
}
