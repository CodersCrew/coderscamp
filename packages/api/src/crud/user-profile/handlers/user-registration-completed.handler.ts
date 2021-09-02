import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { pick } from '@coderscamp/shared/utils/object';

import { UserRegistrationCompletedEvent } from '../../user-registration/events/user-registration-completed.event';
import { UserProfileRepository } from '../user-profile.repository';

@EventsHandler(UserRegistrationCompletedEvent)
export class UserRegistrationCompletedHandler implements IEventHandler<UserRegistrationCompletedEvent> {
  constructor(private readonly usersRepository: UserProfileRepository) {}

  async handle({ payload }: UserRegistrationCompletedEvent) {
    await this.usersRepository.create({ data: pick(payload, ['id', 'fullName', 'email']) });
  }
}
