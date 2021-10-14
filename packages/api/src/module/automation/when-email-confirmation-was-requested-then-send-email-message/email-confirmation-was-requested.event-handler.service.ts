import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ApplicationEvent } from '@/module/application-command-events';
import { SendEmailMessageApplicationCommand, sendEmailMessageCommand } from '@/module/commands/send-email-message';
import { EmailConfirmationWasRequested } from '@/module/events/email-confirmation-was-requested.domain-event';
import { UserRegistrationWasCompleted } from '@/module/events/user-registration-was-completed.domain-event';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

@Injectable()
export class EmailConfirmationWasRequestedEventHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
    private readonly prismaService: PrismaService,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('WhenEmailConfirmationWasRequestedThenSendEmailMessage_Automation_v1')
      .onEvent<EmailConfirmationWasRequested>('EmailConfirmationWasRequested', (event) =>
        this.onEmailConfirmationWasRequested(event),
      )
      .onEvent<UserRegistrationWasCompleted>('UserRegistrationWasCompleted', (event) =>
        this.onEmailConfirmationProcces(event),
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onEmailConfirmationWasRequested(event: ApplicationEvent<EmailConfirmationWasRequested>) {
    if (event.data.confirmationFor !== 'user-registration') return;

    console.log('UXDDD');

    const user = await this.prismaService.userProfile.findUnique({ where: { id: event.data.userId } });

    console.log('USER', user);

    if (!user) throw new Error('User not found');

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
}
