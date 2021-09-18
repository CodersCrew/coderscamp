import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ApproveEmailConfirmationApplicationCommand } from '@/module/commands/approve-email-confirmation';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { approveEmailConfirmation } from '../domain/approve-email-confirmation';
import { EmailConfirmationDomainEvent } from '../domain/events';

@CommandHandler(ApproveEmailConfirmationApplicationCommand)
export class ApproveEmailConfirmationApplicationCommandHandler
  implements ICommandHandler<ApproveEmailConfirmationApplicationCommand>
{
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: ApproveEmailConfirmationApplicationCommand): Promise<void> {
    const { userId, confirmationFor } = command.data;
    const eventStream = EventStreamName.from('EmailConfirmation', `${userId}_${confirmationFor}`);

    await this.applicationService.execute<EmailConfirmationDomainEvent>(
      eventStream,
      command,
      approveEmailConfirmation(command),
    );
  }
}
