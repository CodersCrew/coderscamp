/* eslint-disable no-await-in-loop */
import _ from 'lodash';
import { wait } from 'ts-retry-promise';

import { ApplicationEvent } from '@/module/application-command-events';
import { sampleApplicationEvent } from '@/shared/test-utils';

import { OrderedEventQueue } from './ordered-event-queue';

async function popAll(queue: OrderedEventQueue) {
  const result = [];

  while (queue.length > 0) {
    result.push(await queue.pop());
  }

  return result;
}

function pushAll(queue: OrderedEventQueue, events: ApplicationEvent[]) {
  events.forEach((x) => queue.push(x));
}

function sampleEventsInRange(begin: number, end: number) {
  return _.range(begin, end, 1).map((x) => sampleApplicationEvent({ globalOrder: x }));
}

function randomEventsInRange(begin: number, end: number) {
  return _.shuffle(sampleEventsInRange(begin, end));
}

function sorted(events: ApplicationEvent[]) {
  return events.sort((a, b) => a.globalOrder - b.globalOrder);
}

async function producer(sut: OrderedEventQueue, event: ApplicationEvent, waitingTime: number) {
  await wait(waitingTime);
  sut.push(event);
}

async function consumer(sut: OrderedEventQueue, from: number, waitingTime: number) {
  const result = [];
  let globalOrder = from;
  let event = await sut.pop();

  while (!OrderedEventQueue.isStopToken(event)) {
    if (event.globalOrder === globalOrder) {
      result.push(event);
      globalOrder += 1;
    } else {
      sut.push(event);
      await wait(waitingTime);
    }

    event = await sut.pop();
  }

  return result;
}

function stoppedQueueWithSomeEvents() {
  const sut = new OrderedEventQueue();

  sut.stop();

  const pushedEvents = sampleEventsInRange(1, 5);

  pushAll(sut, pushedEvents);

  return { sut, pushedEvents };
}

describe('OrderedEventQueue', () => {
  it('Given queue when push() then queue should be always sorted in ascending order', async () => {
    // Given
    const sut = new OrderedEventQueue();

    const eventsBatch0 = randomEventsInRange(0, 5);

    pushAll(sut, eventsBatch0);

    // When
    const poppedEvents0 = await popAll(sut);

    // Then
    expect(poppedEvents0).toStrictEqual(sorted(eventsBatch0));

    // When
    const eventsBatch1 = randomEventsInRange(5, 10);

    pushAll(sut, eventsBatch1);
    pushAll(sut, eventsBatch0);

    const poppedEvents1 = await popAll(sut);

    // Then
    expect(poppedEvents1).toStrictEqual(sorted([...eventsBatch0, ...eventsBatch1]));
  });

  it('Queue should be eventualy sorted in ascending order', () => {
    // Given
    const sut = new OrderedEventQueue();
    const startingIndex = 1;
    const timeout = 1000;
    const eventsBatch = randomEventsInRange(startingIndex, 11);

    // When
    const producers = [
      ...eventsBatch.map((event, i) => producer(sut, event, i * 100)),
      wait(timeout).then(() => sut.stop()),
    ];

    // Then
    return Promise.all([
      ...producers,
      consumer(sut, startingIndex, 50).then((poppedEvents) => expect(poppedEvents).toStrictEqual(sorted(eventsBatch))),
    ]);
  });

  it('Given empty queue when push() then pop() should return new event', () => {
    // Given
    const sut = new OrderedEventQueue();
    const waitingTime = 1000;
    const sampleEvent = sampleApplicationEvent({});

    return Promise.all([
      // When
      wait(waitingTime).then(() => sut.push(sampleEvent)),

      // Then
      expect(sut.pop())
        .resolves.toBe(sampleEvent)
        .then(() => expect(sut.length).toBe(0)),
    ]);
  });

  it('Given empty queue when stop() then pop() should return STOP_TOKEN', () => {
    // Given
    const sut = new OrderedEventQueue();
    const timeout = 1000;

    return Promise.all([
      // When
      wait(timeout).then(() => sut.stop()),
      // Then
      expect(sut.pop()).resolves.toBe(OrderedEventQueue.STOP_TOKEN),
    ]);
  });

  it('Given stopped queue when pop() then should return STOP_TOKEN', () => {
    // Given
    const sut = new OrderedEventQueue();

    sut.stop();

    // When-Then
    return Promise.all([
      expect(sut.pop()).resolves.toBe(OrderedEventQueue.STOP_TOKEN),
      expect(sut.pop()).resolves.toBe(OrderedEventQueue.STOP_TOKEN),
    ]);
  });

  it('Given stopped queue with some events when continue() then queue should process events', async () => {
    // Given
    const { sut, pushedEvents } = stoppedQueueWithSomeEvents();

    // When
    sut.continue();

    // Then
    const poppedEvents = await popAll(sut);

    expect(poppedEvents).toStrictEqual(pushedEvents);
  });

  it('Given stopped queue with some events when clear() then queue should by empty', () => {
    // Given
    const { sut } = stoppedQueueWithSomeEvents();

    // When
    sut.clear();

    // Then
    expect(sut.length).toBe(0);
  });

  it('Given valid STOP_TOKEN when isStopToken() then should return true', () => {
    // Given
    const validToken = OrderedEventQueue.STOP_TOKEN;

    // When-Then
    expect(OrderedEventQueue.isStopToken(validToken)).toBeTruthy();
  });

  it('Given invalid STOP_TOKEN when isStopToken() then should return false', () => {
    // Given
    const tokens = ['STOP_TOKEN', Symbol('STOP_TOKEN'), 0, 1, undefined, null, [], {}];

    // When-Then
    tokens.map((invalidToken) => expect(OrderedEventQueue.isStopToken(invalidToken)).toBeFalsy());
  });
});
