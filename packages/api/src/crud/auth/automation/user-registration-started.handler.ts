import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserRegistrationWasStarted } from '@/events/user-registration-was-started.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';

import { AuthUserRepository } from '../auth-user.repository';

@Injectable()
export class UserRegistrationStartedHandler {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  @OnEvent('UserRegistration.UserRegistrationWasStarted')
  async handle(event: ApplicationEvent<UserRegistrationWasStarted>) {
    await this.authUserRepository.createAuthUser({
      data: {
        id: event.data.userId,
        email: event.data.emailAddress,
        password: event.data.hashedPassword,
      },
    });
  }
}
