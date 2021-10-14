import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ApplicationEvent } from '@/module/application-command-events';
import {
  RequestEmailConfirmationApplicationCommand,
  requestEmailConfirmationCommand,
} from '@/module/commands/request-email-conformation';
import { UserRegistrationWasStarted } from '@/module/events/user-registration-was-started.domain-event';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

@Injectable()
export class UserRegistrationWasStartedEventHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('WhenUserRegistrationWasStartedThenRequestEmailConfirmation_Automation_v1')
      .onEvent<UserRegistrationWasStarted>('UserRegistrationWasStarted', (event) =>
        this.onUserRegistrationWasStarted(event),
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onUserRegistrationWasStarted(event: ApplicationEvent<UserRegistrationWasStarted>) {
    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: RequestEmailConfirmationApplicationCommand,
      ...requestEmailConfirmationCommand({
        userId: event.data.userId,
        confirmationToken: idGenerator.generate(),
        confirmationFor: 'user-registration',
      }),
      metadata: { correlationId: event.metadata.correlationId, causationId: event.id },
    }));

    await this.commandBus.execute(command);
  }
}
