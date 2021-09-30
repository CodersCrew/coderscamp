/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */

import { sampleApplicationEvent } from '@/shared/test-utils';

import { initEventsSubscriptionPositionPointerTestFixture } from './events-subscription-position-pointer.fixture.spec';

describe('EventsSubscriptionPositionPointer', () => {
  const fixture = initEventsSubscriptionPositionPointerTestFixture();

  it('Given empty db When increment() Then should create EventsSubscription using startFromGlobalPosition', async () => {
    // Given
    const { sutFactory, expectSubscriptionPosition, assertSubscriptionNotExists } = fixture;
    const startFromGlobalPosition = 5;
    const sut = await sutFactory({ startFromGlobalPosition });

    await assertSubscriptionNotExists();

    // When
    await sut.increment();

    // Then
    expect(sut.current).toBe(startFromGlobalPosition);
    await expectSubscriptionPosition(startFromGlobalPosition);
  });

  it.each([[2, 4, 6]])(
    'Given subscription at position(%d) When increment() %d times Then subscription should be at position(%d)',
    async (startPosition: number, times: number, expected: number) => {
      // Given
      const { sutFactory, ensureSubscriptionExists, expectSubscriptionPosition } = fixture;

      await ensureSubscriptionExists(startPosition);

      const sut = await sutFactory();

      // When
      for (let i = 0; i < times; ++i) {
        await sut.increment();
      }

      // Then
      expect(sut.current).toBe(expected);
      await expectSubscriptionPosition(expected);
    },
  );

  it.each([
    [4, 3, false],
    [4, 4, false],
    [4, 5, true],
    [4, 6, false],
  ])(
    'Given subscription at position(%d) And event with globalOrder(%d) When globalOrderIsPreserved(event) Then should return (%p)',
    async (startPosition: number, globalOrder: number, expected: boolean) => {
      // Given
      const { sutFactory, ensureSubscriptionExists } = fixture;

      await ensureSubscriptionExists(startPosition);

      const sut = await sutFactory();

      const event = { ...sampleApplicationEvent(), globalOrder };

      // When
      const result = sut.globalOrderIsPreserved(event);

      // Then
      expect(result).toBe(expected);
    },
  );

  it.each([
    [4, 3, true],
    [4, 4, true],
    [4, 5, false],
  ])(
    'Given subscription at position(%d) And event with globalOrder(%d) When eventWasProcessed(event) Then should return (%p)',
    async (startPosition: number, globalOrder: number, expected: boolean) => {
      // Given
      const { sutFactory, ensureSubscriptionExists } = fixture;

      await ensureSubscriptionExists(startPosition);

      const sut = await sutFactory();

      const event = { ...sampleApplicationEvent(), globalOrder };

      // When
      const result = sut.eventWasProcessed(event);

      // Then
      expect(result).toBe(expected);
    },
  );

  it.each([
    [4, 7, 7],
    [1, 4, 4],
  ])(
    'Given gap between events(start:%d, end:%d) When initialize EventsSubscriptionPositionPointer Then position should point before next valid event(%d)',
    async (start: number, end: number, expected: number) => {
      // Given
      const { sutFactory, ensureSubscriptionExists, ensureEventsWithGapBetween } = fixture;
      const count = end + 1;
      const startPosition = start - 1;

      await ensureSubscriptionExists(startPosition);
      await ensureEventsWithGapBetween(count, { start, end });

      // When
      const sut = await sutFactory();

      // Then
      expect(sut.current).toBe(expected);
    },
  );
});
