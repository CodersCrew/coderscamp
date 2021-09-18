import { Inject } from '@nestjs/common';

import { ApplicationCommand, ApplicationEvent, DefaultCommandMetadata } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';

import { ApplicationEventBus } from '../../application/application.event-bus';
import { ApplicationService, DomainLogic } from '../../application/application-service';
import { EVENT_REPOSITORY, EventRepository, StorableEvent } from '../../application/event-repository';
import { EventStreamName } from '../../application/event-stream-name.value-object';
import { EventStreamVersion } from '../../application/event-stream-version';
import { ID_GENERATOR, IdGenerator } from '../../application/id-generator';
import {
  PrismaTransactionContext,
  PrismaTransactionManager,
} from '../../application/prisma-transaction-manager/prisma-transaction-manager';
import { TIME_PROVIDER, TimeProvider } from '../../application/time-provider.port';
import { PrismaTransactionEventRepository } from '../transaction-event-repository/prisma-transaction-event-repository';

type ApplicationMetadataContext = { correlationId: string; causationId?: string };

export class EventApplicationService implements ApplicationService {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProvider,
    @Inject(ID_GENERATOR) private readonly idGenerator: IdGenerator,
    private readonly eventBus: ApplicationEventBus,
    private readonly transactionEventRepository: PrismaTransactionEventRepository,
  ) {}

  execute<DomainEventType extends DomainEvent<string, Record<string, unknown>>>(
    streamName: EventStreamName,
    command: ApplicationCommand<DomainEventType['type'], DomainEventType['data'], DefaultCommandMetadata>,
    domainLogic: DomainLogic<DomainEventType>,
  ): Promise<void> {
    const context = PrismaTransactionManager.getContextFromCommand(command);
    const metadata: ApplicationMetadataContext = {
      correlationId: command.id,
      causationId: command.metadata?.causationId,
    };

    return context === undefined
      ? this.executeIndependently(streamName, metadata, domainLogic)
      : this.executeWithTransaction(streamName, metadata, domainLogic, context);
  }

  async executeWithTransaction<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    metadata: ApplicationMetadataContext,
    domainLogic: DomainLogic<DomainEventType>,
    context: PrismaTransactionContext,
  ): Promise<void> {
    const { eventsToStore, streamVersion } = await this.executeDomainLogic(streamName, metadata, domainLogic);

    const eventsToPublishIds = this.transactionEventRepository.write(streamName, eventsToStore, streamVersion, context);

    return context.executeAfterTransaction(async (prisma) => {
      const eventsToPublish = await this.transactionEventRepository.readAll(eventsToPublishIds, prisma);

      await this.eventBus.publishAll(eventsToPublish);
    });
  }

  async executeIndependently<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    metadata: ApplicationMetadataContext,
    domainLogic: DomainLogic<DomainEventType>,
  ): Promise<void> {
    const { eventsToStore, streamVersion } = await this.executeDomainLogic(streamName, metadata, domainLogic);

    const eventsToPublish = await this.eventRepository.write(streamName, eventsToStore, streamVersion);

    await this.eventBus.publishAll(eventsToPublish);
  }

  async executeDomainLogic<DomainEventType extends DomainEvent>(
    streamName: EventStreamName,
    metadata: ApplicationMetadataContext,
    domainLogic: DomainLogic<DomainEventType>,
  ) {
    const eventStream = await this.eventRepository.read(streamName);
    const streamVersion = EventApplicationService.streamVersion(eventStream);

    const resultDomainEvents = await domainLogic(
      eventStream.map((e) => {
        return { type: e.type, data: e.data } as DomainEventType;
      }),
    );

    const eventsToStore: StorableEvent<DomainEventType>[] = resultDomainEvents.map((e, index) => ({
      data: e.data,
      type: e.type,
      id: this.idGenerator.generate(),
      occurredAt: this.timeProvider.currentTime(),
      metadata,
      streamVersion: streamVersion + 1 + index,
      streamName,
    }));

    return { eventsToStore, streamVersion };
  }

  private static streamVersion(eventStream?: ApplicationEvent[]): EventStreamVersion {
    return eventStream?.length ?? 0;
  }
}
