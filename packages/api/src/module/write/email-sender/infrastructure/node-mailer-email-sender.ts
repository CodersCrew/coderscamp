import NodeMailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EmailMessage, EmailSender } from '@/write/email-sender/application/email-sender';

export class NodeMailerEmailSender implements EmailSender {
  private readonly transporter: Mail;

  constructor(transport: { host: string; port: number; secure: boolean; auth?: { user?: string; pass?: string } }) {
    this.transporter = NodeMailer.createTransport({
      host: transport.host,
      port: transport.port,
      secure: transport.secure,
      auth: transport.auth,
    });
  }

  async sendAnEmail(message: EmailMessage): Promise<void> {
    return this.transporter.sendMail({
      from: message.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  }
}
