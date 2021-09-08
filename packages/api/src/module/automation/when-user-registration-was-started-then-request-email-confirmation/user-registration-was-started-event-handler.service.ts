import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';

import { ApplicationEvent } from '@/module/application-command-events';
import {
  RequestEmailConfirmationApplicationCommand,
  requestEmailConfirmationCommand,
} from '@/module/commands/request-email-conformation';
import { UserRegistrationWasStarted } from '@/module/events/user-registration-was-started.domain-event';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';

@Injectable()
export class UserRegistrationWasStartedEventHandler {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @OnEvent('UserRegistration.UserRegistrationWasStarted')
  async handleUserRegistrationWasStartedDomainEvent(event: ApplicationEvent<UserRegistrationWasStarted>) {
    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: RequestEmailConfirmationApplicationCommand,
      ...requestEmailConfirmationCommand({
        userId: event.data.userId,
        confirmationToken: idGenerator.generate(),
        confirmationFor: 'user-registration',
      }),
    }));

    await this.commandBus.execute(command);
  }
}
