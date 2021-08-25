import { TimeProvider } from '../../application/time-provider.port';

export class FixedTimeProvider implements TimeProvider {
  constructor(private time: Date) {}

  currentTime(): Date {
    return this.time;
  }

  travelTo(newTime: Date) {
    this.time = newTime;
  }
}
