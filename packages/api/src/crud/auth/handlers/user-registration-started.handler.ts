import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { pick } from '@coderscamp/shared/utils/object';

import { UserRegistrationStartedEvent } from '../../user-registration/events/user-registration-started.event';
import { AuthUserRepository } from '../auth-user.repository';

@EventsHandler(UserRegistrationStartedEvent)
export class UserRegistrationStartedHandler implements IEventHandler<UserRegistrationStartedEvent> {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async handle({ payload }: UserRegistrationStartedEvent) {
    await this.authUserRepository.createAuthUser({ data: pick(payload, ['id', 'email', 'password']) });
  }
}
