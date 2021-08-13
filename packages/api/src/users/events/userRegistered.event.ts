import type { RegisteredUser } from '@coderscamp/shared/models';

export class UserRegisteredEvent {
  constructor(public readonly input: RegisteredUser) {}
}
