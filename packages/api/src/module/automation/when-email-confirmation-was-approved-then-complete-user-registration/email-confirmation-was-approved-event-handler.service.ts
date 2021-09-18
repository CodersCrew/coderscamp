import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ApplicationEvent } from '@/module/application-command-events';
import {
  CompleteUserRegistrationApplicationCommand,
  completeUserRegistrationCommand,
} from '@/module/commands/complete-user-registration';
import { EmailConfirmationWasApproved } from '@/module/events/email-confirmation-was-approved.domain.event';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

@Injectable()
export class EmailConfirmationWasApprovedEventHandlerService implements OnModuleInit, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
  ) {}

  async onModuleInit() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('WhenEmailConfirmationWasApprovedThenCompleteUserRegistrationAutomationModule_Automation_v1')
      .onEvent<EmailConfirmationWasApproved>('EmailConfirmationWasApproved', (event) =>
        this.onEmailRegistrationWasApproved(event),
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onEmailRegistrationWasApproved(event: ApplicationEvent<EmailConfirmationWasApproved>) {
    const command = this.commandFactory.applicationCommand(() => ({
      class: CompleteUserRegistrationApplicationCommand,
      ...completeUserRegistrationCommand({
        userId: event.data.userId,
      }),
      metadata: { correlationId: event.metadata.correlationId, causationId: event.id },
    }));

    await this.commandBus.execute(command);
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }
}
