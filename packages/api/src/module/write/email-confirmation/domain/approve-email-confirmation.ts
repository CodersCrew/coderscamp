import { ApproveEmailConfirmation } from '@/module/commands/approve-email-confirmation';
import { emailConfirmationWasApprovedEvent } from '@/module/events/email-confirmation-was-approved.domain.event';

import { EmailConfirmationDomainEvent } from './events';

export const approveEmailConfirmation =
  (command: ApproveEmailConfirmation) =>
  (pastEvents: EmailConfirmationDomainEvent[]): EmailConfirmationDomainEvent[] => {
    const lastPublishedEmailConfirmation = pastEvents.pop();

    if (!lastPublishedEmailConfirmation) throw new Error("Could't find request which could be approved");

    if (lastPublishedEmailConfirmation.type === 'EmailConfirmationWasApproved')
      throw new Error('Email has been already confirmed');

    if (lastPublishedEmailConfirmation.data.confirmationToken !== command.data.confirmationToken)
      throw new Error('An attempt was made on obsolete token');

    return [emailConfirmationWasApprovedEvent(command.data)];
  };
