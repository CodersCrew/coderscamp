import { TimeProvider } from '../../application/time-provider.port';

export class SystemTimeProvider implements TimeProvider {
  currentTime(): Date {
    return new Date();
  }
}
