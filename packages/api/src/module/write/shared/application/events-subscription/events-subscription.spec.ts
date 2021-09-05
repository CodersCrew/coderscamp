import { AsyncReturnType } from 'type-fest';

import {
  AnotherSampleDomainEvent,
  anotherSampleDomainEvent,
  initWriteTestModule,
  SampleDomainEvent,
  sampleDomainEvent,
  sequence,
} from '@/shared/test-utils';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsFactory } from '@/write/shared/application/events-subscription/events-subscriptions.factory';

async function initTestEventsSubscription() {
  const app = await initWriteTestModule();

  const eventsSubscriptions: EventsSubscriptionsFactory =
    app.get<EventsSubscriptionsFactory>(EventsSubscriptionsFactory);

  return { eventsSubscriptions, ...app };
}

// todo: tests for transaction consistency and failures!
describe('Events subscription', () => {
  let sut: AsyncReturnType<typeof initTestEventsSubscription>;

  beforeEach(async () => {
    sut = await initTestEventsSubscription();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('given some events occurred, when subscription start, then should process old events', async () => {
    // Given
    const { eventsSubscriptions } = sut;
    const eventStream = sut.randomEventStreamName();
    const event = sampleDomainEvent();

    await sut.eventsOccurred(eventStream, [event, event, event, event]);

    // When
    const onInitialPosition = jest.fn();
    const onSampleDomainEvent = jest.fn();
    const subscriptionId = sut.randomUuid();
    const subscription = eventsSubscriptions
      .subscription(subscriptionId)
      .onInitialPosition(onInitialPosition)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
      .build();

    await subscription.start();

    // Then
    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 4,
    });
    await expect(onInitialPosition).toHaveBeenCalledTimes(1);
    await expect(onSampleDomainEvent).toHaveBeenCalledTimes(4);
  });

  it('when event processing fail, then subscription position should not be moved', async () => {
    // Given
    const { eventsSubscriptions } = sut;
    const eventStream = sut.randomEventStreamName();
    const event = sampleDomainEvent();

    await sut.eventsOccurred(eventStream, [event, event, event, event, event]);

    // When
    const onInitialPosition = jest.fn();
    const onSampleDomainEvent = jest
      .fn()
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {
        throw new Error('Event processing failure');
      })
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {});
    const subscriptionId = sut.randomUuid();
    const subscription = eventsSubscriptions
      .subscription(subscriptionId)
      .onInitialPosition(onInitialPosition)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
      .build();

    await subscription.start();

    // Then
    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 2,
    });
    await expect(onInitialPosition).toHaveBeenCalledTimes(1);
    await expect(onSampleDomainEvent).toHaveBeenCalledTimes(3);

    // When restart
    await subscription.start();

    // Then should process events
    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 5,
    });
    await expect(onInitialPosition).toHaveBeenCalledTimes(1);
    await expect(onSampleDomainEvent).toHaveBeenCalledTimes(6);
  });

  it('given no events before, when subscription start, then should process events occurred after subscription start', async () => {
    // Given
    const { eventsSubscriptions } = sut;

    const eventStream1 = EventStreamName.from('StreamCategory', sut.randomEventId());
    const eventStream2 = EventStreamName.from('StreamCategory', sut.randomEventId());
    const sampleEvent = sampleDomainEvent({ value1: 'value1', value2: 2 });
    const anotherSampleEvent = anotherSampleDomainEvent({ value1: 'value1', value2: 2 });

    // When
    const onInitialPosition = jest.fn();
    const onSampleDomainEvent = jest.fn();
    const onAnotherSampleDomainEvent = jest.fn();
    const subscriptionId = sut.randomUuid();
    const subscription: EventsSubscription = eventsSubscriptions
      .subscription(subscriptionId)
      .onInitialPosition(onInitialPosition)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
      .onEvent<AnotherSampleDomainEvent>('AnotherSampleDomainEvent', onAnotherSampleDomainEvent)
      .build();

    await subscription.start();

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

    // Then
    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 10,
    });
    expect(onInitialPosition).toHaveBeenCalledTimes(1);
    expect(onSampleDomainEvent).toHaveBeenCalledTimes(6);
    expect(onAnotherSampleDomainEvent).toHaveBeenCalledTimes(4);
  });

  it('when start, then should catchup with previous events and then process new events', async () => {
    // Given
    const { eventsSubscriptions } = sut;

    const eventStream1 = EventStreamName.from('StreamCategory', sut.randomEventId());

    const sampleEvent = sampleDomainEvent({ value1: 'value1', value2: 2 });
    const anotherSampleEvent = anotherSampleDomainEvent({ value1: 'value1', value2: 2 });

    await sut.eventsOccurred(
      eventStream1,
      sequence(25).map(() => sampleEvent),
    );

    // When
    let lastEventValue;
    const onInitialPosition = jest.fn();
    const onSampleDomainEvent = jest.fn();
    const subscriptionId = sut.randomUuid();
    const subscription: EventsSubscription = eventsSubscriptions
      .subscription(subscriptionId)
      .onInitialPosition(onInitialPosition)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
      .onEvent<AnotherSampleDomainEvent>('AnotherSampleDomainEvent', (e) => {
        lastEventValue = e.data.value2;
      })
      .build();

    await subscription.start();

    const lastEvent = anotherSampleDomainEvent({ value1: 'lastEventValue', value2: 2 });

    await sut.eventsOccurred(eventStream1, [
      sampleEvent,
      anotherSampleEvent,
      sampleEvent,
      anotherSampleEvent,
      lastEvent,
    ]);

    // Then all events published in the meantime should be processed
    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 30,
    });
    expect(onInitialPosition).toHaveBeenCalledTimes(1);
    expect(onSampleDomainEvent).toHaveBeenCalledTimes(27);

    // Then value should be from last published event
    expect(lastEventValue).toBe(lastEvent.data.value2);
  }, 10000);
});
