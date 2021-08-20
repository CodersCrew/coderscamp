import { Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { ApplicationService } from '../../core/application-service';
import { EVENT_STORE, EventRepository } from '../../core/event-repository';
import { EventStreamName } from '../../core/event-stream-name.valueboject';
import { DomainCommand, EventStreamVersion } from '../../core/slice.types';
import { DomainEvent } from '../../core/slices';
import { TIME_PROVIDER, TimeProvider } from '../../core/time-provider.port';

// todo: try to hide most of the logic (id, causation correlation etc here). Maybe some Message wrapper object?
export class EventStoreApplicationService implements ApplicationService {
  constructor(
    @Inject(EVENT_STORE) private readonly eventStore: EventRepository,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
    private readonly eventBus: EventBus,
  ) {}

  async execute(streamName: EventStreamName, command: DomainCommand): Promise<void> {
    const eventStream = await this.eventStore.read(streamName);
    const uncommitedChanges = command(eventStream, this.timeProvider.currentTime());

    await this.eventStore.write(streamName, uncommitedChanges, EventStoreApplicationService.streamVersion(eventStream));
    this.eventBus.publishAll(uncommitedChanges);
  }

  private static streamVersion(eventStream?: DomainEvent[]): EventStreamVersion {
    return eventStream?.length ?? 0;
  }
}
