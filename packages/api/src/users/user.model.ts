import { AggregateRoot } from '@nestjs/cqrs';

import { RegisteredUser, UserInformation } from '@coderscamp/shared/models/user';

import { GithubUserData } from '../auth/github/github.model';
import { UserRegisteredEvent } from './events/userRegistered.event';

interface UserModelInterface {
  register: (input: GithubUserData) => void;
}

export class UserModel extends AggregateRoot implements UserModelInterface {
  // private readonly id!: number;

  constructor(properties: UserInformation | RegisteredUser | Omit<RegisteredUser, 'id'>) {
    super();
    Object.assign(this, properties);
  }

  register(input: GithubUserData) {
    this.apply(Object.assign(new UserRegisteredEvent(input), this));
  }
}
