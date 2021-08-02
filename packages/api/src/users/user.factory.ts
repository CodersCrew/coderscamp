import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { RegisteredUser, UserInformation } from '@coderscamp/shared/models/user';

import { UserModel } from './user.model';

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(properties: Omit<RegisteredUser, 'id'>): UserModel {
    return this.eventPublisher.mergeObjectContext(new UserModel(properties));
  }

  reconstruct(properties: UserInformation | RegisteredUser): UserModel {
    return this.eventPublisher.mergeObjectContext(new UserModel(properties));
  }
}
