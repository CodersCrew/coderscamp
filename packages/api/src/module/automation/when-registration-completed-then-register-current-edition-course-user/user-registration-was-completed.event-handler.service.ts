import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ApplicationEvent } from '@/module/application-command-events';
import { RegisterCourseUserCommand } from '@/module/commands/register-course-user';
import { RequestEmailConfirmationApplicationCommand } from '@/module/commands/request-email-conformation';
import { UserRegistrationWasCompleted } from '@/module/events/user-registration-was-completed.domain-event';
import { env } from '@/shared/env';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

@Injectable()
export class UserRegistrationWasCompletedEventHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('WhenUserRegistrationWasCompletedThenRegisterCourseUser_Automation_v1')
      .onEvent<UserRegistrationWasCompleted>('UserRegistrationWasCompleted', (event) =>
        this.onUserRegistrationWasCompleted(event),
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onUserRegistrationWasCompleted(event: ApplicationEvent<UserRegistrationWasCompleted>) {
    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: RequestEmailConfirmationApplicationCommand,
      ...RegisterCourseUserCommand({
        userId: event.data.userId,
        courseUserId: idGenerator.generate(),
        courseId: env.CURRENT_COURSE_ID,
      }),
      metadata: { correlationId: event.metadata.correlationId, causationId: event.id },
    }));

    await this.commandBus.execute(command);
  }
}
