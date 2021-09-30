import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';

import { UserRegistrationWasStarted } from '@/events/user-registration-was-started.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import {
  EventsSubscription,
  PrismaTransactionManager,
} from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

import { AuthUserRepository } from '../auth-user.repository';

@Injectable()
export class UserRegistrationStartedHandler implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
    private readonly authUserRepository: AuthUserRepository,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('CreateAuthUserWhenUserRegistrationWasStarted_Automation_v1')
      .onInitialPosition(this.onInitialPosition)
      .onEvent<UserRegistrationWasStarted>('UserRegistrationWasStarted', (event) =>
        this.onUserRegistrationWasStarted(event),
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onInitialPosition(_position: number, context: { transaction: PrismaTransactionManager }) {
    await context.transaction.authUser.deleteMany({});
  }

  async onUserRegistrationWasStarted(event: ApplicationEvent<UserRegistrationWasStarted>) {
    await this.authUserRepository.createAuthUser({
      data: {
        id: event.data.userId,
        email: event.data.emailAddress,
        password: event.data.hashedPassword,
      },
    });
  }
}
