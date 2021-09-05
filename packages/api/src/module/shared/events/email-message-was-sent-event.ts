import type { EmailId } from '@/shared/domain.types';

export type EmailMessageWasSent = {
  type: 'EmailMessageWasSent';
  data: { emailMessageId: EmailId; from: string; to: string; subject: string; text: string; html: string };
};
