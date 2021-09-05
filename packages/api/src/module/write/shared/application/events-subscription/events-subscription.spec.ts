import { AsyncReturnType } from 'type-fest';

import {
  anotherSampleDomainEvent,
  AnotherSampleDomainEvent,
  initWriteTestModule,
  SampleDomainEvent,
  sampleDomainEvent
} from '@/shared/test-utils';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscriptions } from '@/write/shared/application/events-subscription/events-subscriptions';
import {EventsSubscription} from "@/write/shared/application/events-subscription/events-subscription";

async function initTestEventsSubscription() {
  const app = await initWriteTestModule();

  const eventsSubscriptions: EventsSubscriptions = app.get<EventsSubscriptions>(EventsSubscriptions);

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

    await subscription.catchUp();

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

    await subscription.subscribe();

    await sut.eventsOccurred(eventStream1, [sampleEvent, anotherSampleEvent, sampleEvent, anotherSampleEvent]);

    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 4,
    });
    expect(onInitialPosition).toHaveBeenCalledTimes(1);
    expect(onSampleDomainEvent).toHaveBeenCalledTimes(2);
    expect(onAnotherSampleDomainEvent).toHaveBeenCalledTimes(2);
  });
});
