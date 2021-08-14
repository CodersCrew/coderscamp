import { AggregateRoot } from '@nestjs/cqrs';

import type { RegisteredUser, User } from '@coderscamp/shared/models';

import { UserRegisteredEvent } from './events';

interface UserModelInterface {
  register: (input: RegisteredUser) => void;
}

export class UserModel extends AggregateRoot implements UserModelInterface {
  constructor(input: RegisteredUser | User) {
    super();
    Object.assign(this, input);
  }

  register(input: RegisteredUser) {
    this.apply(Object.assign(new UserRegisteredEvent(input), this));
  }
}
