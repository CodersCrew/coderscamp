import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { pick } from '@coderscamp/shared/utils/object';

import { AuthUserRepository } from '../auth-user.repository';
import { UserRegistrationStartedEvent } from '../events/user-registration-started.event';

@EventsHandler(UserRegistrationStartedEvent)
export class UserRegistrationStartedHandler implements IEventHandler<UserRegistrationStartedEvent> {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async handle({ payload }: UserRegistrationStartedEvent) {
    await this.authUserRepository.createAuthUser({ data: pick(payload, ['id', 'email', 'password']) });
  }
}
