import { wait } from 'ts-retry-promise';
import { AsyncReturnType } from 'type-fest';
import waitForExpect from 'wait-for-expect';

import { ApplicationEvent } from '@/module/application-command-events';
import {
  AnotherSampleDomainEvent,
  anotherSampleDomainEvent,
  SampleDomainEvent,
  sampleDomainEvent,
  sampleDomainEventType2,
  sequence,
} from '@/shared/test-utils';
import { using } from '@/shared/using';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';

import {
  initEventsSubscriptionConcurrencyTestFixture,
  initTestEventsSubscription,
} from './events-subscription.fixture.spec';

describe('Events subscription', () => {
  let sut: AsyncReturnType<typeof initTestEventsSubscription>;
  let subscription: EventsSubscription;

  const onInitialPosition = jest.fn();
  const onSampleDomainEvent = jest.fn();
  const onAnotherSampleDomainEvent = jest.fn();

  beforeEach(async () => {
    onInitialPosition.mockReset();
    onSampleDomainEvent.mockReset();
    onAnotherSampleDomainEvent.mockReset();

    sut = await initTestEventsSubscription();

    subscription = sut.eventsSubscriptions
      .subscription(sut.randomUuid(), {
        start: { from: { globalPosition: 1 } },
        retry: { retries: 3, backoff: 'LINEAR', delay: 50 },
      })
      .onInitialPosition(onInitialPosition)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
      .onEvent<AnotherSampleDomainEvent>('AnotherSampleDomainEvent', onAnotherSampleDomainEvent)
      .build();
  });

  afterEach(async () => {
    await subscription.stop();
    await sut.close();
  });

  it('given some events occurred, when subscription start, then should process old events', async () => {
    // Given
    const eventStream = sut.randomEventStreamName();
    const event = sampleDomainEvent();
    const notSubscribedEvent = sampleDomainEventType2();

    await sut.eventsOccurred(eventStream, [event, event, notSubscribedEvent, event, event]);

    // When - Then
    await using(subscription, async () => {
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(4));
      await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1));
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 5,
      });
    });
  });

  it('when event processing fail after retries, then subscription position should not be moved', async () => {
    // Given
    const eventStream = sut.randomEventStreamName();
    const event = sampleDomainEvent();

    await sut.eventsOccurred(
      eventStream,
      sequence(6).map(() => event),
    );

    onSampleDomainEvent
      .mockImplementationOnce(() => {}) // 1. event #1 - success
      .mockImplementationOnce(() => {
        throw new Error('Event processing failure'); // 2. event #2 - fail
      })
      .mockImplementationOnce(() => {}) // 3. event #2 - success (retry: 1)
      .mockImplementationOnce(() => {
        throw new Error('Event processing failure'); // 4. event #3 - fail
      })
      .mockImplementationOnce(() => {}) // 5. event #3 - success (retry: 2)
      .mockImplementationOnce(() => {
        throw new Error('Event processing failure'); // 6. event #4 - failure
      })
      .mockImplementationOnce(() => {}) // 7. event #4 - success (retry: 3)
      .mockImplementationOnce(() => {
        throw new Error('Event processing failure'); // 8. event #5 - failure - no retries!
      })
      .mockImplementationOnce(() => {}) // 9. event #5 - success (after next start)
      .mockImplementationOnce(() => {}); // 10. event #6 - success (after next start)

    // When - Then
    await using(subscription, async () => {
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 4,
      });
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(8));
      await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1));
    });

    // When invoke start once more - Then should start processing from last successfully processed event
    await using(subscription, async () => {
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 6,
      });
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(10));
      await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1));
    });
  });

  it('given no events before, when subscription start, then should process events occurred after subscription start', async () => {
    // Given
    const eventStream1 = EventStreamName.from('StreamCategory', sut.randomEventId());
    const eventStream2 = EventStreamName.from('StreamCategory', sut.randomEventId());
    const sampleEvent = sampleDomainEvent({ value1: 'value1', value2: 2 });
    const anotherSampleEvent = anotherSampleDomainEvent({ value1: 'value1', value2: 2 });

    // When - Then
    await using(subscription, async () => {
      await sut.eventsOccurred(eventStream1, [
        sampleEvent,
        anotherSampleEvent,
        sampleEvent,
        anotherSampleEvent,
        sampleEvent,
      ]);
      await sut.eventsOccurred(eventStream2, [
        anotherSampleEvent,
        sampleEvent,
        sampleEvent,
        anotherSampleEvent,
        sampleEvent,
      ]);

      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(6));
      await waitForExpect(() => expect(onAnotherSampleDomainEvent).toHaveBeenCalledTimes(4));
      await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1));

      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 10,
      });
    });
  });

  it('when start, then should catchup with previous events and then process new events', async () => {
    // Given
    const eventStream1 = EventStreamName.from('StreamCategory', sut.randomEventId());

    const sampleEvent = sampleDomainEvent({ value1: 'value1', value2: 2 });
    const anotherSampleEvent = anotherSampleDomainEvent({ value1: 'value1', value2: 2 });

    await sut.eventsOccurred(
      eventStream1,
      sequence(25).map(() => sampleEvent),
    );

    let lastEventValue: string | undefined;

    onAnotherSampleDomainEvent.mockImplementation((e) => {
      lastEventValue = e.data.value1;
    });

    // When - Then
    await using(subscription, async () => {
      const lastEvent = anotherSampleDomainEvent({ value1: 'lastEventValue', value2: 2 });

      await sut.eventsOccurred(eventStream1, [
        sampleEvent,
        anotherSampleEvent,
        sampleEvent,
        anotherSampleEvent,
        lastEvent,
      ]);

      // all events published in the meantime should be processed
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(27));
      await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1));
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 30,
      });

      // value should be from last published event
      expect(lastEventValue).toBe(lastEvent.data.value1);
    });
  });

  it('Should support recurrent events', async () => {
    // Given
    const eventStream = sut.randomEventStreamName();
    const sampleEvent = sampleDomainEvent();
    const anotherSampleEvent = anotherSampleDomainEvent();

    onSampleDomainEvent.mockImplementationOnce(() => sut.eventsOccurred(eventStream, [anotherSampleEvent]));
    onAnotherSampleDomainEvent.mockImplementationOnce(() => {});

    await using(subscription, async () => {
      // When
      await sut.eventsOccurred(eventStream, [sampleEvent]);

      // Then
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(1));
      await waitForExpect(() => expect(onAnotherSampleDomainEvent).toHaveBeenCalledTimes(1));
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 2,
      });
    });
  });

  it('Should eventually process all events even if there are gaps in globalOrder', async () => {
    // Given
    const eventStream = sut.randomEventStreamName();
    const expectedPosition = 30;
    const events = sequence(expectedPosition).map(() => sampleDomainEvent());
    const gap0 = { start: 1, end: 5 };
    const gap1 = { start: 12, end: 15 };
    const gap2 = { start: 21, end: 29 };
    const numberOfEvents =
      expectedPosition - (gap0.end - gap0.start + (gap1.end - gap1.start) + (gap2.end - gap2.start));

    await sut.eventsOccurred(eventStream, events);

    await sut.createGapBetweenEvents(gap0);
    await sut.createGapBetweenEvents(gap1);
    await sut.createGapBetweenEvents(gap2);

    // When
    await using(subscription, async () => {
      // Then
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(numberOfEvents));
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: expectedPosition,
      });
    });
  });
});

describe('Events subscription concurrency tests', () => {
  let fixture: AsyncReturnType<typeof initEventsSubscriptionConcurrencyTestFixture>;
  const options = {
    maxRetryCount: 5,
    waitingTimeOnRetry: 100,
  };

  beforeEach(async () => {
    fixture = await initEventsSubscriptionConcurrencyTestFixture(options);
  });

  afterEach(async () => {
    await fixture.close();
  });

  it('Should eventualy process all events in order', async () => {
    // Given
    const {
      sut,
      mocks: { onSampleDomainEvent, onAnotherSampleDomainEvent },
      helpers: { randomEventStreamName, concurrencyTestFixture, expectSubscriptionPosition },
    } = fixture;
    const eventStream = randomEventStreamName();
    const eventBatch0 = sequence(8).map(() => sampleDomainEvent());
    const eventBatch1 = sequence(4).map(() => sampleDomainEvent());
    const eventBatch2 = sequence(3).map(() => anotherSampleDomainEvent());
    const numberOfSampleEvents = eventBatch0.length + eventBatch1.length;
    const numberOfAnotherSamplEvents = eventBatch2.length;
    const numberOfEvents = numberOfSampleEvents + numberOfAnotherSamplEvents;

    const processedEvents: ApplicationEvent[] = [];

    onSampleDomainEvent.mockImplementation((event) => {
      processedEvents.push(event);
    });
    onAnotherSampleDomainEvent.mockImplementation((event) => {
      processedEvents.push(event);
    });

    await using(sut, async () => {
      // When
      const [applicationEventBatch0, applicationEventBatch1, applicationEventBatch2] =
        await concurrencyTestFixture.eventsOccurred(eventStream, [eventBatch0, eventBatch1, eventBatch2]);

      await concurrencyTestFixture.publishEvents(applicationEventBatch2);
      await wait(200);
      await concurrencyTestFixture.publishEvents(applicationEventBatch1);
      await wait(200);
      await concurrencyTestFixture.publishEvents(applicationEventBatch0);

      // Then
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(numberOfSampleEvents));
      await waitForExpect(() => expect(onAnotherSampleDomainEvent).toHaveBeenCalledTimes(numberOfAnotherSamplEvents));
      await expectSubscriptionPosition({
        subscriptionId: sut.subscriptionId,
        position: numberOfEvents,
      });
      expect(processedEvents.map((x) => x.globalOrder)).toStrictEqual(sequence(numberOfEvents).map((x) => x + 1));
    });
  });
});
