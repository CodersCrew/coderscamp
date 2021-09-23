import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompleteUserRegistrationApplicationCommand } from '@/module/commands/complete-user-registration';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { completeUserRegistration } from '../domain/CompleteUserRegistration';
import { UserRegistrationDomainEvent } from '../domain/events';

@CommandHandler(CompleteUserRegistrationApplicationCommand)
export class CompleteUserRegistrationCommandHandler
  implements ICommandHandler<CompleteUserRegistrationApplicationCommand>
{
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: CompleteUserRegistrationApplicationCommand) {
    const {
      data: { userId },
    } = command;

    await this.applicationService.execute<UserRegistrationDomainEvent>(
      EventStreamName.from('UserRegistration', userId),
      { correlationId: command.metadata.correlationId, causationId: command.metadata.causationId },
      completeUserRegistration(command),
    );
  }
}
