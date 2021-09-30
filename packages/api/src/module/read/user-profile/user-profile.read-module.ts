import { Module, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';

import { UserRegistrationWasCompleted } from '@/events/user-registration-was-completed.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import {
  EventsSubscription,
  PrismaTransactionManager,
} from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { SharedModule } from '@/write/shared/shared.module';

import { UserProfileController } from './user-profile.controller';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [SharedModule],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository],
})
export class UserProfileReadModule implements OnApplicationBootstrap, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  constructor(
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
    private readonly usersRepository: UserProfileRepository,
  ) {}

  async onApplicationBootstrap() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('UserProfile_ReadModel_v1')
      .onInitialPosition(this.onInitialPosition)
      .onEvent<UserRegistrationWasCompleted>('UserRegistrationWasCompleted', (event) =>
        this.onUserRegistrationWasCompleted(event),
      )
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onInitialPosition(_position: number, context: { transaction: PrismaTransactionManager }) {
    await context.transaction.userProfile.deleteMany({});
  }

  async onUserRegistrationWasCompleted(event: ApplicationEvent<UserRegistrationWasCompleted>) {
    await this.usersRepository.create({
      data: {
        id: event.data.userId,
        fullName: event.data.fullName,
        email: event.data.emailAddress,
      },
    });
  }
}
