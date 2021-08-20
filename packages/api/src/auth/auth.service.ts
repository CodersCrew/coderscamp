import { ConflictException, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';

import { registerError } from '@coderscamp/shared/models/auth/register';
import { pick } from '@coderscamp/shared/utils/object';

import { AuthRepository } from './auth.repository';
import { hashPassword } from './auth.utils';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';

@Injectable()
export class AuthService {
  constructor(private readonly eventBus: EventBus, private readonly authRepository: AuthRepository) {}

  async register(data: Prisma.RegistrationFormCreateInput & Prisma.AuthUserCreateInput) {
    const current = await this.authRepository.findRegistrationForm({ where: { email: data.email } });

    if (current) {
      throw new ConflictException(registerError.REGISTRATION_FORM_ALREADY_EXISTS);
    }

    const password = await hashPassword(data.password);

    const registrationForm = await this.authRepository.createRegistrationForm({
      data: pick(data, ['fullName', 'email']),
    });

    await this.authRepository.createAuthUser({ data: { email: data.email, password } });

    this.eventBus.publish(new UserRegistrationCompletedEvent(registrationForm));
  }
}
