import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';

import { ApplicationEvent } from '@/module/application-command-events';
import {
  RequestEmailConfirmationApplicationCommand,
  requestEmailConfirmationCommand,
} from '@/module/commands/request-email-conformation';
import { UserRegistrationWasStarted } from '@/module/events/user-registration-was-started.domain-event';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { PrismaTransactionContext } from '@/write/shared/application/prisma-transaction-manager/prisma-transaction-manager';

@Injectable()
export class UserRegistrationWasStartedEventHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('WhenUserRegistrationWasStartedThenRequestEmailConfirmation_Automation_v1')
      .onEvent<UserRegistrationWasStarted>('UserRegistrationWasStarted', this.onUserRegistrationWasStarted.bind(this))
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onUserRegistrationWasStarted(
    context: PrismaTransactionContext,
    event: ApplicationEvent<UserRegistrationWasStarted>,
  ) {
    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: RequestEmailConfirmationApplicationCommand,
      ...requestEmailConfirmationCommand({
        userId: event.data.userId,
        confirmationToken: idGenerator.generate(),
        confirmationFor: 'user-registration',
      }),
      metadata: { correlationId: event.metadata.correlationId, causationId: event.id },
    }));

    await context.executeCommand(command);
  }
}
