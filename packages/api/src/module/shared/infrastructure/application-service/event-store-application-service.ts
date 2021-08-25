import { Inject } from '@nestjs/common';

import { ApplicationEventBus } from '../../application/application.event-bus';
import { ApplicationEvent } from '../../application/application-command-events';
import { ApplicationExecutionContext, ApplicationService } from '../../application/application-service';
import { EVENT_STORE, EventRepository } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.valueboject';
import { ID_GENERATOR, IdGenerator } from '../../application/id-generator';
import { DomainLogic, EventStreamVersion } from '../../application/slice.types';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';
import { DomainEvent } from '../../domain/domain.event';

export class EventStoreApplicationService implements ApplicationService {
  constructor(
    @Inject(EVENT_STORE) private readonly eventStore: EventRepository,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
    @Inject(ID_GENERATOR) private readonly idGenerator: IdGenerator,
    private readonly eventBus: ApplicationEventBus,
  ) {}

  async execute<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    context: ApplicationExecutionContext,
    domainLogic: DomainLogic<DomainEventType>,
  ): Promise<void> {
    const eventStream = await this.eventStore.read(streamName);
    const streamVersion = EventStoreApplicationService.streamVersion(eventStream);

    const resultDomainEvents = domainLogic(
      eventStream.map((e) => {
        return { type: e.type, data: e.data } as DomainEventType;
      }),
    );

    const uncommitedEvents: ApplicationEvent[] = resultDomainEvents.map((e, index) => ({
      data: e.data,
      type: e.type,
      id: this.idGenerator.generate(),
      occurredAt: this.timeProvider.currentTime(),
      metadata: { correlationId: context.correlationId, causationId: context.causationId },
      streamVersion: streamVersion + index,
      streamName,
    }));

    await this.eventStore.write(streamName, uncommitedEvents, streamVersion);

    await this.eventBus.publishAll(uncommitedEvents);
  }

  private static streamVersion(eventStream?: ApplicationEvent[]): EventStreamVersion {
    return eventStream?.length ?? 0;
  }
}
