import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { registerError } from '@coderscamp/shared/models/auth/register';

import { RegisterUserApplicationCommand } from '@/commands/register-user';
import { isUniqueConstraintError } from '@/prisma/prisma.errors';
import { DomainRuleViolationException } from '@/shared/errors/domain-rule-violation.exception';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { PASSWORD_ENCODER, PasswordEncoder } from '@/write/shared/application/password-encoder';
import { UserRegistrationDomainEvent } from '@/write/user-registration/domain/events';
import { registerUser } from '@/write/user-registration/domain/registerUser';

import { UserRegistrationEmails } from './user-registration-emails.service';

@CommandHandler(RegisterUserApplicationCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserApplicationCommand> {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
    private readonly emails: UserRegistrationEmails,
    @Inject(PASSWORD_ENCODER)
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async execute(command: RegisterUserApplicationCommand) {
    const { data } = command;
    const hashedPassword = await this.passwordEncoder.encode(data.plainPassword);

    try {
      await this.emails.lockEmailAddress({ userId: data.userId, emailAddress: data.emailAddress });

      await this.applicationService.execute<UserRegistrationDomainEvent>(
        EventStreamName.from('UserRegistration', data.userId),
        command,
        (pastEvents) => registerUser(pastEvents, command, hashedPassword),
      );
    } catch (ex) {
      await this.emails.unlockEmailAddress({ emailAddress: command.data.emailAddress });

      if (isUniqueConstraintError(ex)) {
        throw new DomainRuleViolationException(registerError.USER_WAS_ALREADY_REGISTERED, { cause: ex, command });
      }
    }
  }
}
