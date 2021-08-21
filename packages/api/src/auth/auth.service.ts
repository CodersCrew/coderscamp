import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { prismaErrors } from 'src/prisma/prisma.errors';

import { registerError } from '@coderscamp/shared/models/auth/register';
import { pick } from '@coderscamp/shared/utils/object';

import { AuthUserRepository } from './auth-user.repository';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { hashPassword } from './local/local.utils';
import { UserRegistrationRepository } from './user-registration.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly authUserRepository: AuthUserRepository,
    private readonly userRegistrationRepository: UserRegistrationRepository,
  ) {}

  async register(data: Prisma.UserRegistrationCreateInput & Prisma.AuthUserCreateInput) {
    try {
      const userRegistrationData = pick(data, ['fullName', 'email']);
      const password = await hashPassword(data.password);

      const { id } = await this.userRegistrationRepository.createUserRegistration({ data: userRegistrationData });

      await this.authUserRepository.createAuthUser({ data: { id, email: data.email, password } });

      this.eventBus.publish(new UserRegistrationCompletedEvent({ id, ...userRegistrationData }));
    } catch (ex) {
      if (ex instanceof PrismaClientKnownRequestError && ex.code === prismaErrors.UNIQUE_CONSTRAINT) {
        throw new ConflictException(registerError.REGISTRATION_FORM_ALREADY_EXISTS);
      }

      throw new InternalServerErrorException(ex);
    }
  }
}
