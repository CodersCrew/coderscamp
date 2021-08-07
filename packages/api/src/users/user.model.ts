import { AggregateRoot } from '@nestjs/cqrs';

import { RegisteredUser, User } from '@coderscamp/shared/models/user';

import { UserRegisteredEvent } from './events/userRegistered.event';

interface UserModelInterface {
  register: (input: Omit<RegisteredUser, 'id'>) => void;
}

export class UserModel extends AggregateRoot implements UserModelInterface {
  constructor(properties: User | RegisteredUser | Omit<RegisteredUser, 'id'>) {
    super();
    Object.assign(this, properties);
  }

  register(input: Omit<RegisteredUser, 'id'>) {
    this.apply(Object.assign(new UserRegisteredEvent(input), this));
  }
}
