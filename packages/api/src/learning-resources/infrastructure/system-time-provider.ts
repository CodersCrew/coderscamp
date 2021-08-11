import {TimeProvider} from "../core/time-provider";

export class SystemTimeProvider implements TimeProvider {
  currentTime(): Date {
    return new Date();
  }
}
