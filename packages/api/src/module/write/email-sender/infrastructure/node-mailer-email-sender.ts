import NodeMailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EmailSender } from '@/write/email-sender/application/email-sender';

export class NodeMailerEmailSender implements EmailSender {
  private readonly transporter: Mail;

  readonly mailFrom: string;

  constructor(transport: {
    host: string;
    port: number;
    from: string;
    secure: boolean;
    auth?: { user?: string; pass?: string };
  }) {
    this.mailFrom = transport.from;
    this.transporter = NodeMailer.createTransport({
      host: transport.host,
      port: transport.port,
      secure: transport.secure,
      auth: transport.auth,
    });
  }

  async sendAnEmail(mailOptions: { to: string; subject: string; text: string; html: string }): Promise<void> {
    return this.transporter.sendMail({
      from: this.mailFrom,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    });
  }
}
