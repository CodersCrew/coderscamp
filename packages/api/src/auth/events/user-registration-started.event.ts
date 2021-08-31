import type { UserRegistration } from '@prisma/client';

export class UserRegistrationStartedEvent {
  constructor(public readonly payload: UserRegistration & { password: string }) {}
}
