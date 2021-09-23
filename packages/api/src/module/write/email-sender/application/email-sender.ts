export const EMAIL_SENDER = Symbol('EMAIL_SENDER');

export type EmailMessage = { from: string; to: string; subject: string; text: string; html: string };

export interface EmailSender {
  sendAnEmail(message: EmailMessage): Promise<void>;
}
