import { RequestEmailConfirmation } from '@/module/commands/request-email-conformation';
import { emailConfirmationWasRequestedEvent } from '@/module/events/email-confirmation-was-requested.domain-event';

import { EmailConfirmationDomainEvent } from './events';

export const requestEmailConfirmation = (command: RequestEmailConfirmation) => (): EmailConfirmationDomainEvent[] => {
  return [emailConfirmationWasRequestedEvent(command.data)];
};
