import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { ApplicationEvent } from '@/module/application-command-events';
import { DomainEvent } from '@/module/domain.event';
import { PrismaModule } from '@/prisma/prisma.module';
import { AnotherSampleDomainEvent, initWriteTestModule, SampleDomainEvent, sequence } from '@/shared/test-utils';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { SharedModule } from '@/write/shared/shared.module';

import { eventEmitterRootModule } from '../../../../../event-emitter.root-module';
import { ApplicationEventBus } from '../application.event-bus';
import { SubscriptionOptions } from './events-subscription';

export async function initTestEventsSubscription() {
  const app = await initWriteTestModule({
    modules: [],
    configureModule: Test.createTestingModule({
      imports: [eventEmitterRootModule, PrismaModule, SharedModule],
    }),
  });
  const eventsSubscriptions: EventsSubscriptionsRegistry =
    app.get<EventsSubscriptionsRegistry>(EventsSubscriptionsRegistry);

  return { eventsSubscriptions, ...app };
}

export interface EventsSubscriptionConcurrencyTestFixture {
  publishEvents(events: ApplicationEvent[]): Promise<void>;
  eventsOccurred(eventStream: EventStreamName, eventBatches: DomainEvent[][]): Promise<ApplicationEvent[][]>;
}

class EventsSubscriptionConcurrencyTestFixtureImpl implements EventsSubscriptionConcurrencyTestFixture {
  private readonly traceIdSelector = 'EventsSubscriptionConcurrencyTestFixtureTraceID';

  private readonly collector = new Map<string, ApplicationEvent[]>();

  constructor(
    private readonly publishAllImpl: (events: ApplicationEvent[]) => Promise<void>,
    private readonly eventsOccurredImpl: (eventStreamName: EventStreamName, events: DomainEvent[]) => Promise<void>,
  ) {}

  publishEvents(events: ApplicationEvent[]): Promise<void> {
    return this.publishAllImpl(events);
  }

  async eventsOccurred(eventStream: EventStreamName, eventBatches: DomainEvent[][]): Promise<ApplicationEvent[][]> {
    const tracingKeys: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const eventBatch of eventBatches) {
      tracingKeys.push(this.generateTraceId(eventBatch));
      // eslint-disable-next-line no-await-in-loop
      await this.eventsOccurredImpl(eventStream, eventBatch);
    }

    return tracingKeys.map((key) => {
      const result = this.collector.get(key);

      if (result === undefined) {
        throw new Error(`Events with traceID: ${key} were not collected`);
      }

      this.collector.delete(key);

      return result;
    });
  }

  private generateTraceId(eventBatch: DomainEvent[]): string {
    const traceId = uuid();

    eventBatch.forEach((event) => {
      // eslint-disable-next-line no-param-reassign
      event.data[this.traceIdSelector] = traceId;
    });

    return traceId;
  }

  async publishAll<EventType extends ApplicationEvent>(events: EventType[]): Promise<void> {
    events.forEach((event) => {
      const traceId = event.data[this.traceIdSelector] as string;

      if (traceId === undefined) {
        throw new Error(
          `Event(${JSON.stringify(event)}) was not generated by EventsSubscriptionConcurrencyTestFixture`,
        );
      }

      if (!this.collector.has(traceId)) {
        this.collector.set(traceId, []);
      }

      this.collector.get(traceId)?.push(event);
    });
  }
}

export async function initEventsSubscriptionConcurrencyTestFixture(options: SubscriptionOptions['queue']) {
  const fixtureBase = await initTestEventsSubscription();

  const onInitialPosition = jest.fn();
  const onSampleDomainEvent = jest.fn();
  const onAnotherSampleDomainEvent = jest.fn();

  const sut = fixtureBase.eventsSubscriptions
    .subscription(fixtureBase.randomUuid(), { queue: options })
    .onInitialPosition(onInitialPosition)
    .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
    .onEvent<AnotherSampleDomainEvent>('AnotherSampleDomainEvent', onAnotherSampleDomainEvent)
    .build();

  async function close() {
    await sut.stop();
    await fixtureBase.close();
  }

  const eventBus = fixtureBase.get<ApplicationEventBus>(ApplicationEventBus);

  const concurrencyTestFixtureImpl = new EventsSubscriptionConcurrencyTestFixtureImpl(
    eventBus.publishAll.bind(eventBus),
    fixtureBase.eventsOccurred.bind(fixtureBase),
  );

  // monkey patch eventBus
  eventBus.publishAll = jest
    .fn()
    .mockImplementation(concurrencyTestFixtureImpl.publishAll.bind(concurrencyTestFixtureImpl));

  return {
    sut,
    close,
    mocks: { onInitialPosition, onSampleDomainEvent, onAnotherSampleDomainEvent },
    helpers: {
      concurrencyTestFixture: concurrencyTestFixtureImpl as EventsSubscriptionConcurrencyTestFixture,
      ...fixtureBase,
    },
  };
}

export function expectEventsOrder(events: ApplicationEvent[], expectedNumberOfEvents: number) {
  expect(events.map((x) => x.globalOrder)).toStrictEqual(sequence(expectedNumberOfEvents).map((x) => x + 1));
}
