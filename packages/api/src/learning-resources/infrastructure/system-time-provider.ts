import { TimeProvider } from '../core/time-provider.port';

export class SystemTimeProvider implements TimeProvider {
  currentTime(): Date {
    return new Date();
  }
}
