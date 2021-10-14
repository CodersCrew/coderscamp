import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ApplicationEvent } from '@/module/application-command-events';
import { SendEmailMessageApplicationCommand, sendEmailMessageCommand } from '@/module/commands/send-email-message';
import { EmailConfirmationWasRequested } from '@/module/events/email-confirmation-was-requested.domain-event';
import { UserId } from '@/shared/domain.types';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { EventRepository } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { UserRegistrationWasStarted } from '@/events/user-registration-was-started.domain-event';

type AutomationEvent = EmailConfirmationWasRequested | UserRegistrationWasStarted;

@Injectable()
export class EmailConfirmationWasRequestedEventHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
    private readonly eventRepository: EventRepository,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('WhenEmailConfirmationWasRequestedThenSendEmailMessage_Automation_v1')
      .onEvent<EmailConfirmationWasRequested>('EmailConfirmationWasRequested', (event) =>
        this.onEmailConfirmationWasRequested(event),
      )
      .onEvent<UserRegistrationWasStarted>('UserRegistrationWasStarted', (event) =>
        this.onUserRegistrationWasCompleted(event),
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onEmailConfirmationWasRequested(event: ApplicationEvent<EmailConfirmationWasRequested>) {
    if (event.data.confirmationFor !== 'user-registration') return;

    const eventStream = EventStreamName.from(
      'WhenEmailConfirmationWasRequestedThenSendEmailMessage_Automation',
      event.data.userId,
    );

    // todo: no expected stream version
    await this.eventRepository.write(eventStream, [event], undefined!);

    await this.sendEmailIfPossible(event.data.userId, event);
  }

  private async sendEmailIfPossible(userId: UserId, event: ApplicationEvent) {
    const eventStream = EventStreamName.from(
      'WhenEmailConfirmationWasRequestedThenSendEmailMessage_Automation',
      userId,
    );

    const stream = (await this.eventRepository.read(eventStream)).map(
      (e) => ({ data: e.data, type: e.type } as AutomationEvent),
    );

    stream.reduce<Partial<{ emailToSend: EmailConfirmationWasRequested['data']; userEmail: string }>>(
      (state, event) => {
        switch (event.type) {
          case 'EmailConfirmationWasRequested':
            return { ...state, emailToSend: event.data };
          case 'UserRegistrationWasStarted':
            return { ...state, userEmail: event.data.emailAddress };
          default:
            return state;
        }
      },
      {
        emailToSend: undefined,
        userEmail: undefined,
      },
    );

    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: SendEmailMessageApplicationCommand,
      ...sendEmailMessageCommand({
        emailMessageId: idGenerator.generate(),
        to: user.email,
        subject: 'Confirm your account',
        text: '',
        html: '',
      }),
      metadata: { correlationId: event.metadata.correlationId, causationId: event.id },
    }));

    await this.commandBus.execute(command);
  }

  async onUserRegistrationWasStarted(event: ApplicationEvent<UserRegistrationWasStarted>) {
    const eventStream = EventStreamName.from(
      'WhenEmailConfirmationWasRequestedThenSendEmailMessage_Automation',
      event.data.userId,
    );

    // todo: no expected stream version
    await this.eventRepository.write(eventStream, [event], undefined!);

    await this.sendEmailIfPossible(event.data.userId, event);
  }
}
