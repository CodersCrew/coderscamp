import { Query } from '@nestjs-architects/typed-cqrs';

import type { UserId } from '../../users/users.types';

export class WhatIsUserNameQuery extends Query<string> {
  constructor(public readonly payload: { id: UserId }) {
    super();
  }
}
