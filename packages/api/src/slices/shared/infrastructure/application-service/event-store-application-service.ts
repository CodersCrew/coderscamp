import { Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { ApplicationExecutionContext, ApplicationService } from '../../core/application-service';
import { EVENT_STORE, EventRepository } from '../../core/event-repository';
import { EventStreamName } from '../../core/event-stream-name.valueboject';
import { ID_GENERATOR, IdGenerator } from '../../core/id-generator';
import { DomainLogic, EventStreamVersion } from '../../core/slice.types';
import { ApplicationEvent } from '../../core/slices';
import { TIME_PROVIDER, TimeProvider } from '../../core/time-provider.port';

// todo: try to hide most of the logic (id, causation correlation etc here). Maybe some Message wrapper object?
export class EventStoreApplicationService implements ApplicationService {
  constructor(
    @Inject(EVENT_STORE) private readonly eventStore: EventRepository,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
    @Inject(ID_GENERATOR) private readonly idGenerator: IdGenerator,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    streamName: EventStreamName,
    context: ApplicationExecutionContext,
    domainLogic: DomainLogic,
  ): Promise<void> {
    const eventStream = await this.eventStore.read(streamName);
    const resultDomainEvents = domainLogic(eventStream);

    const uncommitedChanges: ApplicationEvent[] = resultDomainEvents.map((e) => ({
      data: e.data,
      type: e.type,
      id: this.idGenerator.generate(),
      occurredAt: this.timeProvider.currentTime(),
      metadata: { correlationId: context.correlationId, causationId: context.causationId },
    }));

    await this.eventStore.write(streamName, uncommitedChanges, EventStoreApplicationService.streamVersion(eventStream));
    this.eventBus.publishAll(uncommitedChanges);
  }

  private static streamVersion(eventStream?: ApplicationEvent[]): EventStreamVersion {
    return eventStream?.length ?? 0;
  }
}
