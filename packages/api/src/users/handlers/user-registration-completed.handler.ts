import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegistrationCompletedEvent } from 'src/auth/events/user-registration-completed.event';

import { UsersRepository } from '../users.repository';

@EventsHandler(UserRegistrationCompletedEvent)
export class UserRegistrationCompletedHandler implements IEventHandler<UserRegistrationCompletedEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(event: UserRegistrationCompletedEvent) {
    await this.usersRepository.create({ data: event.payload });
  }
}
