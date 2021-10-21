import { Inject, Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UserRegistrationWasStarted } from '@/events/user-registration-was-started.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { SendEmailMessageApplicationCommand, sendEmailMessageCommand } from '@/module/commands/send-email-message';
import { EmailConfirmationWasRequested } from '@/module/events/email-confirmation-was-requested.domain-event';
import { UserId } from '@/shared/domain.types';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EVENT_REPOSITORY, EventRepository } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

type AutomationEvent = EmailConfirmationWasRequested | UserRegistrationWasStarted;

const SUBSCRIPTION_NAME = 'WhenEmailConfirmationWasRequestedThenSendEmailMessage';

@Injectable()
export class EmailConfirmationWasRequestedEventHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription(`${SUBSCRIPTION_NAME}_Automation_v1`)
      .onEvent<EmailConfirmationWasRequested>('EmailConfirmationWasRequested', (event) =>
        this.onEmailConfirmationWasRequested(event),
      )
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
    const { userId } = event.data;
    const eventStream = EmailConfirmationWasRequestedEventHandler.eventStreamFor(userId);

    await this.applicationService.execute(eventStream, { ...event.metadata }, () => [event]);

    await this.sendEmailIfPossible(event.data.userId, event);
  }

  async onEmailConfirmationWasRequested(event: ApplicationEvent<EmailConfirmationWasRequested>) {
    if (event.data.confirmationFor !== 'user-registration') return;

    const { userId } = event.data;
    const eventStream = EmailConfirmationWasRequestedEventHandler.eventStreamFor(userId);

    await this.applicationService.execute(eventStream, { ...event.metadata }, () => [event]);

    await this.sendEmailIfPossible(userId, event);
  }

  private static eventStreamFor(userId: string) {
    return EventStreamName.from(SUBSCRIPTION_NAME, userId);
  }

  private async sendEmailIfPossible(userId: UserId, event: ApplicationEvent) {
    const eventStream = EmailConfirmationWasRequestedEventHandler.eventStreamFor(userId);

    const { pastEvents } = await this.eventRepository.readDomainStream<AutomationEvent>(eventStream);

    const { requestData, userEmail } = pastEvents.reduce<{
      requestData?: EmailConfirmationWasRequested['data'];
      userEmail?: string;
    }>((state, e) => {
      switch (e.type) {
        case 'EmailConfirmationWasRequested':
          return { ...state, requestData: e.data };
        case 'UserRegistrationWasStarted':
          return { ...state, userEmail: e.data.emailAddress };
        default:
          return state;
      }
    }, {});

    if (!userEmail || !requestData) {
      return;
    }

    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: SendEmailMessageApplicationCommand,
      ...sendEmailMessageCommand({
        emailMessageId: idGenerator.generate(),
        to: userEmail,
        subject: 'Confirm your account',
        text: `
          Click on link below to confirm your account registration:
          https://coderscamp.edu.pl/app/confirmation/${requestData.confirmationToken}
        `,
        html: `
          <div>
            Click on link below to confirm your account registration:
            https://coderscamp.edu.pl/app/confirmation/${requestData.confirmationToken}
          </div>
        `,
      }),
      metadata: { correlationId: event.metadata.correlationId, causationId: event.id },
    }));

    await this.commandBus.execute(command);
  }
}
