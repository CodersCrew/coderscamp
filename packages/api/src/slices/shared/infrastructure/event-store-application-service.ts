import { Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { ApplicationService, DomainCommand, EventStreamVersion } from '../core/application-service';
import { EVENT_STORE, EventStore } from '../core/event-store';
import { EventStreamName } from '../core/event-stream-name.valueboject';
import { DomainEvent } from '../core/slices';

export class EventStoreApplicationService implements ApplicationService {
  constructor(@Inject(EVENT_STORE) private readonly eventStore: EventStore, private readonly eventBus: EventBus) {}

  async execute(streamName: EventStreamName, command: DomainCommand): Promise<void> {
    const eventStream = await this.eventStore.read(streamName);
    const uncommitedChanges = command(eventStream);

    await this.eventStore.write(streamName, uncommitedChanges, EventStoreApplicationService.streamVersion(eventStream));
    this.eventBus.publishAll(uncommitedChanges);
  }

  private static streamVersion(eventStream?: DomainEvent[]): EventStreamVersion {
    return eventStream?.length ?? 0;
  }
}
