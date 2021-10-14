import { EmailConfirmationWasApproved } from '@/module/events/email-confirmation-was-approved.domain.event';
import { EmailConfirmationWasRequested } from '@/module/events/email-confirmation-was-requested.domain-event';

export type EmailConfirmationDomainEvent = EmailConfirmationWasRequested | EmailConfirmationWasApproved;
