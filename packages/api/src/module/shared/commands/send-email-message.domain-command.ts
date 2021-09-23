import { EmailId } from '@/shared/domain.types';

export type SendEmailMessage = {
  type: 'SendEmailMessage';
  data: {
    emailMessageId: EmailId;
    to: string;
    subject: string;
    text: string;
    html: string;
  };
};
