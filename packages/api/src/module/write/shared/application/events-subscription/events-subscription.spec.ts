import { AsyncReturnType } from 'type-fest';

import { initWriteTestModule, SampleDomainEvent, sampleDomainEvent } from '@/shared/test-utils';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscriptions } from '@/write/shared/application/events-subscription/events-subscriptions';

async function initTestEventsSubscription() {
  const app = await initWriteTestModule();

  const eventsSubscriptions = app.get<EventsSubscriptions>(EventsSubscriptions);

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

  it('test', async () => {
    const { eventsSubscriptions } = sut;

    const eventStream = EventStreamName.from('StreamCategory', sut.randomEventId());

    const event = sampleDomainEvent({ value1: 'value1', value2: 2 });

    await sut.eventsOccurred(eventStream, [event, event, event, event]);

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

    await subscription.subscribe();

    await sut.eventsOccurred(eventStream, [event, event, event, event]);

    await sut.expectSubscriptionPosition({
      subscriptionId,
      position: 8,
    });
    expect(onInitialPosition).toBeCalledWith(0);
    expect(onSampleDomainEvent).toHaveBeenCalledTimes(4);
  });
});
