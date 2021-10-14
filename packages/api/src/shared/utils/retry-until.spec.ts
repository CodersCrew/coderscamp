import _ from 'lodash';
import { wait } from 'ts-retry-promise';

import { LoopWithRetryConfig, retryUntil } from './retry-until';

function initLoopWithRetryFixture() {
  const until = jest.fn().mockReturnValue(true);
  const logger = jest.fn();
  const fn = jest.fn();

  function mockThrowTimes(times: number) {
    _.range(times).forEach(() => {
      fn.mockRejectedValueOnce(new Error('Throw'));
      until.mockReturnValueOnce(true);
    });
  }

  const config = {
    until,
    logger,
    delay: 100,
    backoff: 'FIXED',
    maxBackoff: 500,
    resetBackoffAfter: 6 * 1000,
  } as LoopWithRetryConfig;

  return {
    fn,
    symbol: Symbol('expected'),
    config,
    until,
    logger,
    mockThrowTimes,
  };
}

describe('retryUntil tests', () => {
  const fixture = initLoopWithRetryFixture();
  let setTimeoutSpy = jest.spyOn(global, 'setTimeout');

  function getNLastDelays(n: number) {
    return _.takeRight(
      setTimeoutSpy.mock.calls.map((x) => x[1]),
      n,
    );
  }

  beforeEach(() => {
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
    setTimeoutSpy.mockRestore();
  });

  it('Should support logging error', async () => {
    // Given
    const { fn, until, logger, config } = fixture;
    const error = new Error('Throw');

    fn.mockRejectedValueOnce(error);
    until.mockReturnValueOnce(true).mockReturnValueOnce(false);

    // When
    await retryUntil(fn, config);

    // Then
    const result = logger.mock.calls[0][0];

    expect(result).toBe(error);
  });

  it('Should support until with resolved result', async () => {
    // Given
    const { fn, until, config, symbol: expected } = fixture;

    fn.mockRejectedValueOnce(new Error('Throw'))
      .mockRejectedValueOnce(new Error('Throw'))
      .mockResolvedValueOnce(expected);

    until.mockImplementation((value) => value !== expected);

    // When
    const result = await retryUntil(fn, config);

    // Then
    expect(result).toBe(expected);
  });

  it('Should support until with rejected error', async () => {
    // Given
    const { fn, until, config } = fixture;
    const error = new Error('Throw');

    fn.mockRejectedValueOnce(new Error('Throw')).mockRejectedValueOnce(new Error('Throw')).mockRejectedValueOnce(error);

    until.mockImplementation((value) => value !== error);

    // When
    const result = await retryUntil(fn, config);

    // Then
    expect(result).toBe(error);
  });

  it('Should support maxBackoff', async () => {
    // Given
    const { fn, until, config: defaultConfig, mockThrowTimes } = fixture;
    const numberOfRetrays = 3;
    const sampleDelay = 100;
    const sampleMaxBackoff = sampleDelay * numberOfRetrays;
    const numberOfMeasurements = 3;
    const config: LoopWithRetryConfig = {
      ...defaultConfig,
      backoff: 'LINEAR',
      delay: sampleDelay,
      maxBackoff: sampleMaxBackoff,
    };
    const expected = _.times(numberOfMeasurements, _.constant(sampleMaxBackoff));

    mockThrowTimes(numberOfRetrays + numberOfMeasurements);

    until.mockReturnValueOnce(false);

    // When
    await retryUntil(fn, config);

    // Then
    const result = getNLastDelays(numberOfMeasurements);

    expect(result).toStrictEqual(expected);
  });

  it('Should support resetBackoffAfter', async () => {
    // Given
    const { fn, until, config: defaultConfig, mockThrowTimes } = fixture;
    const numberOfRetrays = 4;
    const sampleDelay = 50;
    const sampleMaxBackoff = sampleDelay * numberOfRetrays;
    const resetBackoffAfter = 500;
    const numberOfMeasurements = 3;
    const config = {
      ...defaultConfig,
      backoff: 'LINEAR',
      delay: sampleDelay,
      maxBackoff: sampleMaxBackoff,
      resetBackoffAfter,
    } as LoopWithRetryConfig;
    const expected = [50, 100, 150];

    mockThrowTimes(numberOfRetrays);

    // Wait until reset
    fn.mockImplementationOnce(() => wait(resetBackoffAfter + 100));

    mockThrowTimes(numberOfMeasurements);

    until.mockReturnValueOnce(false);

    // When
    await retryUntil(fn, config);

    // Then
    const result = getNLastDelays(numberOfMeasurements);

    expect(result).toStrictEqual(expected);
  });

  it.each([
    ['FIXED', 100, 5, [100, 100, 100, 100, 100]],
    ['EXPONENTIAL', 10, 3, [10, 100, 1000]],
    ['LINEAR', 50, 4, [50, 100, 150, 200]],
  ])('Should support backoff(%s)', async (arg0: string, delay: number, times: number, expected: number[]) => {
    const backoff = arg0 as LoopWithRetryConfig['backoff'];
    const { fn, until, config: defaultConfig, mockThrowTimes } = fixture;
    const config = { ...defaultConfig, delay, backoff, maxBackoff: _.max(expected) } as LoopWithRetryConfig;

    mockThrowTimes(times);
    until.mockReturnValueOnce(false);

    // When
    await retryUntil(fn, config);

    // Then
    const result = getNLastDelays(times);

    expect(result).toStrictEqual(expected);
  });
});
