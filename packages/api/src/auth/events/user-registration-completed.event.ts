import { RegistrationForm } from '@prisma/client';

export class UserRegistrationCompletedEvent {
  constructor(public readonly payload: Pick<RegistrationForm, 'id' | 'email' | 'fullName'>) {}
}
