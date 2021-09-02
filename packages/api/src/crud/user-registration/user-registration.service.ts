import { Inject, Injectable } from '@nestjs/common';

import { pick } from '@coderscamp/shared/utils/object';

import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';

import { hashPassword } from '../auth/local/local.utils';
import { UserRegistrationCompletedEvent } from './events/user-registration-completed.event';
import { UserRegistrationStartedEvent } from './events/user-registration-started.event';
import { UserRegistrationRepository } from './user-registration.repository';
import {RegisterUserApplicationCommand} from "@/commands/register-user";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

@Injectable()
export class UserRegistrationService {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
    private readonly userRegistrationRepository: UserRegistrationRepository,
  ) {}

  async register(command: RegisterUserApplicationCommand) {
    const {data} = command;
    const password = await hashPassword(data.plainPassword);

    const userRegistration = await this.userRegistrationRepository.createUserRegistration({
      data: pick(data, ['fullName', 'email']),
    });

    this.eventBus.publish(new UserRegistrationStartedEvent({ ...userRegistration, password }));
    this.eventBus.publish(new UserRegistrationCompletedEvent(userRegistration));
  }
}
