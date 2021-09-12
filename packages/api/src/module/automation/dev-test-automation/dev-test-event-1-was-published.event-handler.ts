import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ApplicationEvent } from '@/module/application-command-events';
import {
  devTestCommand2,
  DevTestCommand2ApplicationCommand,
} from '@/module/commands/dev-test-command-2.domain-command';
import { DevTestEvent1 } from '@/module/events/dev-test-event-1.domain-event';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';

@Injectable()
export class DevTestEvent1EventHandler implements OnModuleInit, OnModuleDestroy {
  private eventsSubscription: EventsSubscription;

  private readonly logger = new Logger(DevTestEvent1EventHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly commandFactory: ApplicationCommandFactory,
    private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
  ) {}

  async onModuleInit() {
    this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('DevTestEvent1_Automation_v1')
      .onEvent<DevTestEvent1>('DevTestEvent1', (event) => this.onDevTestEvent1(event))
      .build();
    await this.eventsSubscription.start();
  }

  async onModuleDestroy() {
    await this.eventsSubscription.stop();
  }

  async onDevTestEvent1(event: ApplicationEvent<DevTestEvent1>) {
    const printableEvent = JSON.stringify(event);

    this.logger.log(`recived event(${printableEvent})`);

    const command = this.commandFactory.applicationCommand(() => ({
      class: DevTestCommand2ApplicationCommand,
      ...devTestCommand2({
        counter: event.data.counter,
        id: event.data.id,
      }),
      metadata: { correlationId: event.metadata.correlationId, causationId: event.id },
    }));

    await this.commandBus.execute(command);
  }
}
