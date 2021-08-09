import { AggregateRoot } from '@nestjs/cqrs';

import type { RegisteredUser, User } from '@coderscamp/shared/models/user';

import { UserRegisteredEvent } from './events';

interface UserModelInterface {
  register: (input: Omit<RegisteredUser, 'id'>) => void;
}

export class UserModel extends AggregateRoot implements UserModelInterface {
  constructor(input: RegisteredUser | User) {
    super();
    Object.assign(this, input);
  }

  register(input: Omit<RegisteredUser, 'id'>) {
    this.apply(Object.assign(new UserRegisteredEvent(input), this));
  }
}
