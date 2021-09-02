import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { pick } from '@coderscamp/shared/utils/object';

import { hashPassword } from '../auth/local/local.utils';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { UserRegistrationStartedEvent } from './events/user-registration-started.event';
import { UserRegistrationRepository } from './user-registration.repository';

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userRegistrationRepository: UserRegistrationRepository,
  ) {}

  async register(data: RegisterData) {
    const password = await hashPassword(data.password);

    const userRegistration = await this.userRegistrationRepository.createUserRegistration({
      data: pick(data, ['fullName', 'email']),
    });

    this.eventBus.publish(new UserRegistrationStartedEvent({ ...userRegistration, password }));
    this.eventBus.publish(new UserRegistrationCompletedEvent(userRegistration));
  }
}
