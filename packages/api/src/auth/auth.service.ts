import { ConflictException, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';

import { registerError } from '@coderscamp/shared/models/auth/register';
import { pick } from '@coderscamp/shared/utils/object';

import { AuthRepository } from './auth.repository';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { hashPassword } from './local/local.utils';

@Injectable()
export class AuthService {
  constructor(private readonly eventBus: EventBus, private readonly authRepository: AuthRepository) {}

  async register(data: Prisma.UserRegistrationCreateInput & Prisma.AuthUserCreateInput) {
    const current = await this.authRepository.findUserRegistration({ where: { email: data.email } });

    if (current) {
      throw new ConflictException(registerError.REGISTRATION_FORM_ALREADY_EXISTS);
    }

    const userRegistrationData = pick(data, ['fullName', 'email']);
    const password = await hashPassword(data.password);

    const { id } = await this.authRepository.createUserRegistration({ data: userRegistrationData });

    await this.authRepository.createAuthUser({ data: { id, email: data.email, password } });

    this.eventBus.publish(new UserRegistrationCompletedEvent({ id, ...userRegistrationData }));
  }
}
