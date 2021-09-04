import { RequestEmailConfirmation } from '@/module/commands/request-email-conformation';
import { emailConfirmationWasRequestedEvent } from '@/module/events/email-confirmation-was-requested.domain-event';

import { RequestEmailConfirmationDomainEvent } from './events';

export const requestEmailConfirmation =
  (command: RequestEmailConfirmation) => (): RequestEmailConfirmationDomainEvent[] => {
    return [emailConfirmationWasRequestedEvent(command.data)];
  };
