import _ from 'lodash';
import { wait } from 'ts-retry-promise';

import { NotificationToken, NotificationTokenErrorMessages } from './notification-token';

describe('NotificationToken tests', () => {
  const sut = new NotificationToken();

  beforeEach(() => {
    sut.reset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Given wait() without timeout When notify() Then wait should be resolved', async () => {
    // Given
    const wait1 = sut.wait();
    const wait2 = sut.wait();

    // When
    await wait(1000).then(() => sut.notify());

    // Then
    expect(sut.expired).toBeTruthy();
    await expect(wait1).resolves.not.toThrow();
    await expect(wait2).resolves.not.toThrow();
  });

  it.each([[NotificationTokenErrorMessages.EXPIRED]])(
    'Given expired token When notify() Then should throw Error(%s)',
    (expected: string) => {
      // Given
      sut.dispose();

      const fn = () => {
        sut.notify();
      };

      // When - Then
      expect(sut.expired).toBeTruthy();
      expect(fn).toThrow(expected);
      expect(fn).toThrow(expected);
    },
  );

  it.each([[NotificationTokenErrorMessages.EXPIRED]])(
    'Given expired token When wait() Then should throw Error(%s)',
    async (expected: string) => {
      // Given
      sut.dispose();

      // When - Then
      expect(sut.expired).toBeTruthy();
      await expect(sut.wait()).rejects.toThrow(expected);
      await expect(sut.wait()).rejects.toThrow(expected);
    },
  );

  it.each([[NotificationTokenErrorMessages.DISPOSED]])(
    'Given wait() without timeout When dispose() Then should throw Error(%s)',
    async (expected: string) => {
      // Given
      const wait1 = sut.wait();
      const wait2 = sut.wait();

      // When
      sut.dispose();

      // Then
      expect(sut.expired).toBeTruthy();
      await expect(wait1).rejects.toThrow(expected);
      await expect(wait2).rejects.toThrow(expected);
    },
  );

  it('Given expired token When dispose() Then should not throw and be expired', () => {
    // Given
    sut.dispose();
    expect(sut.expired).toBeTruthy();

    // When
    sut.dispose();

    // Then
    expect(sut.expired).toBeTruthy();
  });

  it.each([
    [[50, 100, 200, 300, 500], 30, 0],
    [[50, 100, 200, 300, 500], 100, 2],
    [[50, 100, 200, 300, 500], 1000, 5],
  ])(
    `Given multiple wait() with timeouts(%p) When delay(%d) Then first %d waits should throws Error(${NotificationTokenErrorMessages.TIMEOUT}) And When notify() Then rest of waits should be resolved`,
    async (timeouts: number[], delay: number, throws: number) => {
      // Given
      jest.useFakeTimers();

      const rootWait = sut.wait();
      const waits = timeouts.map((x) => sut.wait(x));
      const waitsThrows = _.take(waits, throws).map((x) =>
        expect(x).rejects.toThrow(NotificationTokenErrorMessages.TIMEOUT),
      );
      const waitsResolved = _.takeRight(waits, waits.length - throws).map((x) => expect(x).resolves.not.toThrow());

      // When
      jest.advanceTimersByTime(delay);

      // Then
      expect(sut.expired).toBeFalsy();
      await Promise.all(waitsThrows);

      // When
      sut.notify();

      // Then
      expect(sut.expired).toBeTruthy();
      await Promise.all(waitsResolved);
      await expect(rootWait).resolves.not.toThrow();
    },
  );
});
