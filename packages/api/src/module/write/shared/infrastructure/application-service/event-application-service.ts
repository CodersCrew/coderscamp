import { Inject, Logger } from '@nestjs/common';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';

import { ApplicationEventBus } from '../../application/application.event-bus';
import { ApplicationExecutionContext, ApplicationService, DomainLogic } from '../../application/application-service';
import { EVENT_REPOSITORY, EventRepository, StorableEvent } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.value-object';
import { EventStreamVersion } from '../../application/event-stream-version';
import { ID_GENERATOR, IdGenerator } from '../../application/id-generator';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';

export class EventApplicationService implements ApplicationService {
  private readonly logger = new Logger(EventApplicationService.name);

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
    this.logger.log(`start reading events from stream(${streamName.raw})`);

    const eventStream = await this.eventRepository.read(streamName);
    const streamVersion = EventApplicationService.streamVersion(eventStream);

    this.logger.log(`read events from stream(${streamName.raw}) with version(${streamVersion})`);

    const resultDomainEvents = await domainLogic(
      eventStream.map((e) => {
        return { type: e.type, data: e.data } as DomainEventType;
      }),
    );

    const eventsToStore: StorableEvent[] = resultDomainEvents.map((e, index) => ({
      data: e.data,
      type: e.type,
      id: this.idGenerator.generate(),
      occurredAt: this.timeProvider.currentTime(),
      metadata: { correlationId: context.correlationId, causationId: context.causationId },
      streamVersion: streamVersion + 1 + index,
      streamName,
    }));

    const printableEventsIDs = JSON.stringify(eventsToStore.reduce<string[]>((p, c) => [...p, c.id], []));

    this.logger.log(`executed domain logic and recived events ${printableEventsIDs}`);

    const eventsToPublish = await this.eventRepository.write(streamName, eventsToStore, streamVersion);

    this.logger.log(`start publishing events ${printableEventsIDs}`);
    await this.eventBus.publishAll(eventsToPublish);
  }

  private static streamVersion(eventStream?: ApplicationEvent[]): EventStreamVersion {
    return eventStream?.length ?? 0;
  }
}
