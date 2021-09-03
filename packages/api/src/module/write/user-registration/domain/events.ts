import { UserRegistrationWasCompleted } from '@/events/user-registration-was-completed.domain-event';
import { UserRegistrationWasStarted } from '@/events/user-registration-was-started.domain-event';

export type UserRegistrationDomainEvent = UserRegistrationWasStarted | UserRegistrationWasCompleted;
