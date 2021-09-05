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

  const eventsSubscriptions: EventsSubscriptionsFactory = app.get<EventsSubscriptionsFactory>(EventsSubscriptionsFactory);

  return { eventsSubscriptions, ...app };
}

describe('Events subscription', () => {
  let sut: AsyncReturnType<typeof initTestEventsSubscription>;

  beforeEach(async () => {
    sut = await initTestEventsSubscription();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('catchUp past events', async () => {
    const { eventsSubscriptions } = sut;

    const eventStream1 = EventStreamName.from('StreamCategory', sut.randomEventId());

    const event = sampleDomainEvent({ value1: 'value1', value2: 2 });

    await sut.eventsOccurred(eventStream1, [event, event, event, event]);

    const onInitialPosition = jest.fn();
    const onSampleDomainEvent = jest.fn();
    const subscriptionId = 'sample-sub-id';
    const subscription = eventsSubscriptions
      .subscription(subscriptionId)
      .onInitialPosition(onInitialPosition)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
      .build();

    await subscription.start();

    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 4,
    });
  });

  it('subscribe new events', async () => {
    const { eventsSubscriptions } = sut;

    const eventStream1 = EventStreamName.from('StreamCategory', sut.randomEventId());

    const sampleEvent = sampleDomainEvent({ value1: 'value1', value2: 2 });
    const anotherSampleEvent = anotherSampleDomainEvent({ value1: 'value1', value2: 2 });

    const onInitialPosition = jest.fn().mockImplementation(() => console.log('onInitialPosition'));
    const onSampleDomainEvent = jest.fn().mockImplementation(() => console.log('onSampleDomainEvent'));
    const onAnotherSampleDomainEvent = jest.fn().mockImplementation(() => console.log('onAnotherSampleDomainEvent'));
    const subscriptionId = 'sample-sub-id';
    const subscription: EventsSubscription = eventsSubscriptions
      .subscription(subscriptionId)
      .onInitialPosition(onInitialPosition)
      .onEvent<SampleDomainEvent>('SampleDomainEvent', onSampleDomainEvent)
      .onEvent<AnotherSampleDomainEvent>('AnotherSampleDomainEvent', onAnotherSampleDomainEvent)
      .build();

    await subscription.start();

    await sut.eventsOccurred(eventStream1, [sampleEvent, anotherSampleEvent, sampleEvent, anotherSampleEvent]);

    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 4,
    });
    expect(onInitialPosition).toHaveBeenCalledTimes(1);
    expect(onSampleDomainEvent).toHaveBeenCalledTimes(2);
    expect(onAnotherSampleDomainEvent).toHaveBeenCalledTimes(2);
  });

  it('catchup and subscribe for new events', async () => {
    const { eventsSubscriptions } = sut;

    const eventStream1 = EventStreamName.from('StreamCategory', sut.randomEventId());

    const sampleEvent = sampleDomainEvent({ value1: 'value1', value2: 2 });
    const anotherSampleEvent = anotherSampleDomainEvent({ value1: 'value1', value2: 2 });

    let lastEventValue;

    await sut.eventsOccurred(
      eventStream1,
      sequence(100).map(() => sampleEvent),
    );

    const onInitialPosition = jest.fn();
    const onSampleDomainEvent = jest.fn();
    const subscriptionId = 'sample-sub-id';
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

    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 105,
    });
    expect(onInitialPosition).toHaveBeenCalledTimes(1);
    expect(onSampleDomainEvent).toHaveBeenCalledTimes(102);
    expect(lastEventValue).toBe(lastEvent.data.value2);
  });
});
