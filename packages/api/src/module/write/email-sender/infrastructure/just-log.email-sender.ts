import { Logger } from '@nestjs/common';

import { EmailMessage, EmailSender } from '@/write/email-sender/application/email-sender';

const logger = new Logger('JustLogEmailSender');

export class JustLogEmailSender implements EmailSender {
  async sendAnEmail(message: EmailMessage): Promise<void> {
    logger.log('Just log email message', message);
  }
}
