import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserRegistrationWasCompleted } from '@/events/user-registration-was-completed.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';

import { UserProfileRepository } from '../user-profile.repository';

@Injectable()
export class CreateUserProfileWhenRegistrationCompletedAutomation {
  constructor(private readonly usersRepository: UserProfileRepository) {}

  @OnEvent('UserRegistration.UserRegistrationWasCompleted')
  async onUserRegistrationWasCompleted(event: ApplicationEvent<UserRegistrationWasCompleted>) {
    await this.usersRepository.create({
      data: {
        id: event.data.userId,
        fullName: event.data.fullName,
        email: event.data.emailAddress,
      },
    });
  }
}
