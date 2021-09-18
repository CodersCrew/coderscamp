import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RequestEmailConfirmationApplicationCommand } from '@/module/commands/request-email-conformation';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { EmailConfirmationDomainEvent } from '../domain/events';
import { requestEmailConfirmation } from '../domain/requestEmailConfirmation';

@CommandHandler(RequestEmailConfirmationApplicationCommand)
export class RequestEmailConfirmationApplicationCommandHandler
  implements ICommandHandler<RequestEmailConfirmationApplicationCommand>
{
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: RequestEmailConfirmationApplicationCommand): Promise<void> {
    const { userId, confirmationFor } = command.data;
    const eventStream = EventStreamName.from('EmailConfirmation', `${userId}_${confirmationFor}`);

    await this.applicationService.execute<EmailConfirmationDomainEvent>(
      eventStream,
      command,
      requestEmailConfirmation(command),
    );
  }
}
