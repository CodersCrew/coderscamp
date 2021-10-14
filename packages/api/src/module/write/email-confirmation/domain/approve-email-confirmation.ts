import { ApproveEmailConfirmation } from '@/module/commands/approve-email-confirmation';
import { emailConfirmationWasApprovedEvent } from '@/module/events/email-confirmation-was-approved.domain.event';

import { EmailConfirmationDomainEvent } from './events';

export const approveEmailConfirmation =
  (command: ApproveEmailConfirmation) =>
  (pastEvents: EmailConfirmationDomainEvent[]): EmailConfirmationDomainEvent[] => {
    const lastPublishedEmailConfirmation = pastEvents[pastEvents.length - 1];

    if (!lastPublishedEmailConfirmation) throw new Error("Couldn't find request which could be approved");

    if (lastPublishedEmailConfirmation.type === 'EmailConfirmationWasApproved')
      throw new Error('Email confirmation has been already approved');

    if (lastPublishedEmailConfirmation.data.confirmationToken !== command.data.confirmationToken)
      throw new Error('An attempt was made on obsolete confirmation token');

    return [emailConfirmationWasApprovedEvent(command.data)];
  };
