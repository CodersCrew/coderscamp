import { EmailMessageId } from '@/shared/domain.types';

export type SendEmailMessage = {
  type: 'SendEmailMessage';
  data: {
    emailMessageId: EmailMessageId;
    to: string;
    subject: string;
    text: string;
    html: string;
  };
};
