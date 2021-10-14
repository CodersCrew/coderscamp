import _ from 'lodash';

import { ApplicationEvent } from '@/module/application-command-events';

export type OrderedEventQueueStopTokenType = typeof OrderedEventQueue.STOP_TOKEN;
export class OrderedEventQueue<TApplicationEvent extends ApplicationEvent = ApplicationEvent> {
  static STOP_TOKEN = Symbol('STOP_TOKEN');

  static isStopToken(value: unknown): value is OrderedEventQueueStopTokenType {
    return value === OrderedEventQueue.STOP_TOKEN;
  }

  protected readonly queue: Readonly<TApplicationEvent>[] = [];

  private resolve?: (value: TApplicationEvent | OrderedEventQueueStopTokenType) => void = undefined;

  private stopped = false;

  public push(val: TApplicationEvent): void {
    // if pop is waiting, notify it
    if (this.resolve !== undefined) {
      const cb = this.resolve;

      this.resolve = undefined;

      return cb(val);
    }

    return this.pushOrdered(val);
  }

  public get length() {
    return this.queue.length;
  }

  public pop(): Promise<TApplicationEvent | OrderedEventQueueStopTokenType> {
    if (this.stopped) {
      return Promise.resolve(OrderedEventQueue.STOP_TOKEN);
    }

    const nextEvent = this.queue.shift();

    // if queue is empty, return awaitable promise
    if (nextEvent === undefined) {
      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    }

    return Promise.resolve(nextEvent);
  }

  public stop(): void {
    if (this.resolve !== undefined) {
      const cb = this.resolve;

      this.resolve = undefined;
      cb(OrderedEventQueue.STOP_TOKEN);
    }

    this.stopped = true;
  }

  public continue(): void {
    this.stopped = false;
  }

  public clear(): void {
    this.stop();
    this.queue.length = 0;
    this.continue();
  }

  private pushOrdered(eventToPush: TApplicationEvent): void {
    // binary search index by globalOrder
    const idx = _.sortedIndexBy(this.queue, eventToPush, (event) => event.globalOrder);

    // insert into queue at idx
    this.queue.splice(idx, 0, eventToPush);
  }
}
