export const EMAIL_SENDER = Symbol('EMAIL_SENDER');

export interface EmailSender {
  readonly mailFrom: string;

  sendAnEmail(mailOptions: { to: string; subject: string; text: string; html: string }): Promise<void>;
}
