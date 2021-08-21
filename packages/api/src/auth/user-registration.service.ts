import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { registerError } from '@coderscamp/shared/models/auth/register';
import { pick } from '@coderscamp/shared/utils/object';

import { isUniqueConstraintError } from '../prisma/prisma.errors';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { UserRegistrationStartedEvent } from './events/user-registration-started.event';
import { hashPassword } from './local/local.utils';
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
    try {
      const password = await hashPassword(data.password);

      const userRegistration = await this.userRegistrationRepository.createUserRegistration({
        data: pick(data, ['fullName', 'email']),
      });

      this.eventBus.publish(new UserRegistrationStartedEvent({ ...userRegistration, password }));
      this.eventBus.publish(new UserRegistrationCompletedEvent(userRegistration));
    } catch (ex) {
      if (isUniqueConstraintError(ex)) {
        throw new ConflictException(registerError.REGISTRATION_FORM_ALREADY_EXISTS);
      }

      throw new InternalServerErrorException(ex);
    }
  }
}
