import type { UserRegistration } from '@prisma/client';

export class UserRegistrationCompletedEvent {
  constructor(public readonly payload: UserRegistration) {}
}
