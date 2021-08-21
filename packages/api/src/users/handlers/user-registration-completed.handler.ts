import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { pick } from '@coderscamp/shared/utils/object';

import { UserRegistrationCompletedEvent } from '../../auth/events/user-registration-completed.event';
import { UsersRepository } from '../users.repository';

@EventsHandler(UserRegistrationCompletedEvent)
export class UserRegistrationCompletedHandler implements IEventHandler<UserRegistrationCompletedEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle({ payload }: UserRegistrationCompletedEvent) {
    await this.usersRepository.create({ data: pick(payload, ['id', 'fullName', 'email']) });
  }
}
