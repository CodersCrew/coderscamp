import { FixedTimeProvider } from './fixed-time-provider';

describe('Fixed time provider', () => {
  it('can travel in time', () => {
    // given
    const timeProvider = new FixedTimeProvider(new Date('2018-04-04T16:00:00.000Z'));

    // then
    expect(timeProvider.currentTime()).toStrictEqual(new Date('2018-04-04T16:00:00.000Z'));

    // when
    timeProvider.timeTravelTo(new Date('2018-04-06T16:23:00.123Z'));

    // then
    expect(timeProvider.currentTime()).toStrictEqual(new Date('2018-04-06T16:23:00.123Z'));
  });
});
