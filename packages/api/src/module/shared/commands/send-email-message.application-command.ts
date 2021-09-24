import { AbstractApplicationCommand } from '@/module/application-command-events';

import { SendEmailMessage } from './send-email-message.domain-command';

export class SendEmailMessageApplicationCommand extends AbstractApplicationCommand<SendEmailMessage> {}
