/* eslint-disable no-await-in-loop */
import { wait } from 'ts-retry-promise';

function backoffStrategyOf(config: LoopWithRetryConfig) {
  switch (config.backoff) {
    case 'EXPONENTIAL':
      return (delay: number) => delay * config.delay;
    case 'LINEAR':
      return (delay: number) => delay + config.delay;
    case 'FIXED':
    default:
      return () => config.delay;
  }
}

export type LoopWithRetryConfig<TResult = never> = Readonly<{
  delay: number;
  backoff: 'FIXED' | 'EXPONENTIAL' | 'LINEAR';
  maxBackoff: number;
  resetBackoffAfter: number;
  until: (result: TResult | Error | undefined) => boolean;
  logger: (msg: string | Error) => void;
}>;

export async function retryUntil<TResult>(fn: () => Promise<TResult>, config: LoopWithRetryConfig<TResult>) {
  const backoffStrategy = backoffStrategyOf(config);
  const { logger, until, maxBackoff } = config;
  let { delay } = config;

  let result: TResult | Error | undefined;

  for (;;) {
    const time = Date.now();

    try {
      result = await fn();
    } catch (e) {
      logger(e as Error);
      result = e as Error;
    }

    if (!until(result)) {
      break;
    }

    if (Date.now() - time >= config.resetBackoffAfter) {
      delay = config.delay;
    }

    // TODO cancel wait when subscriber recive stop signal
    await wait(delay);
    logger(`retry after delay(${delay} ms)`);
    delay = Math.min(backoffStrategy(delay), maxBackoff);
  }

  return result;
}
