import { Inject } from '@nestjs/common';

import { ApplicationEventBus } from '../../application/application.event-bus';
import { ApplicationEvent } from '../../../../shared/application-command-events';
import {
  ApplicationExecutionContext,
  ApplicationService, DomainLogic,
  EventStreamVersion
} from '../../application/application-service';
import { EVENT_REPOSITORY, EventRepository } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.valueboject';
import { ID_GENERATOR, IdGenerator } from '../../application/id-generator';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';
import { DomainEvent } from '../../../../shared/domain.event';

export class EventApplicationService implements ApplicationService {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
    @Inject(ID_GENERATOR) private readonly idGenerator: IdGenerator,
    private readonly eventBus: ApplicationEventBus,
  ) {}

  async execute<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    context: ApplicationExecutionContext,
    domainLogic: DomainLogic<DomainEventType>,
  ): Promise<void> {
    const eventStream = await this.eventRepository.read(streamName);
    const streamVersion = EventApplicationService.streamVersion(eventStream);

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

    await this.eventRepository.write(streamName, uncommitedEvents, streamVersion);

    await this.eventBus.publishAll(uncommitedEvents);
  }

  private static streamVersion(eventStream?: ApplicationEvent[]): EventStreamVersion {
    return eventStream?.length ?? 0;
  }
}
