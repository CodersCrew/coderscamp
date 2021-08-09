import type { RegisteredUser } from '@coderscamp/shared/models/user';

export class UserRegisteredEvent {
  constructor(public readonly input: Omit<RegisteredUser, 'id'>) {}
}
