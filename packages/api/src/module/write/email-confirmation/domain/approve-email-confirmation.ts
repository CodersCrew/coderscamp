import { ApproveEmailConfirmation } from '@/module/commands/approve-email-confirmation';
import { emailConfirmationWasApprovedEvent } from '@/module/events/email-confirmation-was-approved.domain.event';
import { DomainRuleViolationException } from '@/shared/errors/domain-rule-violation.exception';

import { EmailConfirmationDomainEvent } from './events';

export const approveEmailConfirmation =
  (command: ApproveEmailConfirmation) =>
  (pastEvents: EmailConfirmationDomainEvent[]): EmailConfirmationDomainEvent[] => {
    const lastPublishedEmailConfirmation = pastEvents[pastEvents.length - 1];

    if (!lastPublishedEmailConfirmation)
      throw new DomainRuleViolationException("Couldn't find request which could be approved");

    if (lastPublishedEmailConfirmation.type === 'EmailConfirmationWasApproved')
      throw new DomainRuleViolationException('Email confirmation has been already approved');

    if (lastPublishedEmailConfirmation.data.confirmationToken !== command.data.confirmationToken)
      throw new DomainRuleViolationException('An attempt was made on obsolete confirmation token');

    return [emailConfirmationWasApprovedEvent(command.data)];
  };
