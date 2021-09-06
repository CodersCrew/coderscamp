import { Test } from '@nestjs/testing';
import { AsyncReturnType } from 'type-fest';
import waitForExpect from 'wait-for-expect';

import { PrismaModule } from '@/prisma/prisma.module';
import {
  AnotherSampleDomainEvent,
  anotherSampleDomainEvent,
  initWriteTestModule,
  SampleDomainEvent,
  sampleDomainEvent,
  sequence,
} from '@/shared/test-utils';
import { using } from '@/shared/using';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventsSubscription } from '@/write/shared/application/events-subscription/events-subscription';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { SharedModule } from '@/write/shared/shared.module';

import { eventEmitterRootModule } from '../../../../../event-emitter.root-module';

async function initTestEventsSubscription() {
  const app = await initWriteTestModule(
    Test.createTestingModule({
      imports: [eventEmitterRootModule, PrismaModule, SharedModule],
    }),
  );

  const eventsSubscriptions: EventsSubscriptionsRegistry =
    app.get<EventsSubscriptionsRegistry>(EventsSubscriptionsRegistry);

  return { eventsSubscriptions, ...app };
}

// fixme: unstable tests
// todo: tests for transaction consistency and failures!
// eslint-disable-next-line jest/no-disabled-tests
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
      .subscription(sut.randomUuid())
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

    await sut.eventsOccurred(eventStream, [event, event, event, event]);

    // When - Then
    await using(subscription, async () => {
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(4), 10000);
      // await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1), 10000);
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 4,
      });
    });
  });

  it('when event processing fail, then subscription position should not be moved', async () => {
    // Given
    const eventStream = sut.randomEventStreamName();
    const event = sampleDomainEvent();

    await sut.eventsOccurred(eventStream, [event, event, event, event, event]);

    onSampleDomainEvent
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {
        throw new Error('Event processing failure');
      })
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {});

    // When - Then
    await using(subscription, async () => {
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(3), 10000);
      // await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1), 10000);
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 2,
      });
    });

    // When restart - Then should process events
    await using(subscription, async () => {
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(6), 10000);
      // await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1), 10000);
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 5,
      });
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

      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(6), 10000);
      await waitForExpect(() => expect(onAnotherSampleDomainEvent).toHaveBeenCalledTimes(4), 10000);
      // await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1), 10000);

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
      await waitForExpect(() => expect(onSampleDomainEvent).toHaveBeenCalledTimes(27), 10000);
      // await waitForExpect(() => expect(onInitialPosition).toHaveBeenCalledTimes(1), 10000);
      await sut.expectSubscriptionPosition({
        subscriptionId: subscription.subscriptionId,
        position: 30,
      });

      // value should be from last published event
      expect(lastEventValue).toBe(lastEvent.data.value1);
    });
  });
});
