import type { RegistrationForm } from '@prisma/client';

export class UserRegistrationCompletedEvent {
  constructor(public readonly payload: RegistrationForm) {}
}
