import { EmailMessageId } from '@/shared/domain.types';

import { AbstractApplicationCommand } from '../application-command-events';

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

export const sendEmailMessageCommand = (data: SendEmailMessage['data']): SendEmailMessage => ({
  type: 'SendEmailMessage',
  data,
});

export class SendEmailMessageApplicationCommand extends AbstractApplicationCommand<SendEmailMessage> {}
