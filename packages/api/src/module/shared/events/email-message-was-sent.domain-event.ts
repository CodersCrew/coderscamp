import { EmailMessageId } from '@/shared/domain.types';

export type EmailMessageWasSent = {
  type: 'EmailMessageWasSent';
  data: {
    emailMessageId: EmailMessageId;
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  };
};
