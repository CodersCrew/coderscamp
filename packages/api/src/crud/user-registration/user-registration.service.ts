import { Inject, Injectable } from '@nestjs/common';

import { RegisterUserApplicationCommand } from '@/commands/register-user';
import { UserRegistrationDomainEvent } from '@/crud/user-registration/domain/events';
import { UserRegistrationWasCompleted } from '@/events/user-registration-was-completed.domain-event';
import { UserRegistrationWasStarted } from '@/events/user-registration-was-started.domain-event';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { hashPassword } from '../auth/local/local.utils';
import { UserRegistrationEmails } from './user-registration-emails.service';

@Injectable()
export class UserRegistrationService {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
    private readonly emails: UserRegistrationEmails,
  ) {}

  async register(command: RegisterUserApplicationCommand) {
    const { data } = command;
    const hashedPassword = await hashPassword(data.plainPassword);

    await this.emails.lockEmailAddress({ userId: data.userId, emailAddress: data.emailAddress });

    await this.applicationService
      .execute<UserRegistrationDomainEvent>(
        EventStreamName.from('UserRegistration', data.userId),
        { correlationId: command.metadata.correlationId, causationId: command.metadata.causationId },
        () => {
          const userRegistrationWasStarted: UserRegistrationWasStarted = {
            type: 'UserRegistrationWasStarted',
            data: {
              userId: data.userId,
              fullName: data.fullName,
              emailAddress: data.emailAddress,
              hashedPassword,
            },
          };
          const userRegistrationWasCompleted: UserRegistrationWasCompleted = {
            type: 'UserRegistrationWasCompleted',
            data: {
              userId: data.userId,
              fullName: data.fullName,
              emailAddress: data.emailAddress,
            },
          };

          return [userRegistrationWasStarted, userRegistrationWasCompleted];
        },
      )
      .catch(() => this.emails.unlockEmailAddress({ emailAddress: command.data.emailAddress }));
  }
}
