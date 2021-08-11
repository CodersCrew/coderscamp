import {TimeProviderPort} from "../core/time-provider";

export class SystemTimeProvider implements TimeProviderPort {
  currentTime(): Date {
    return new Date();
  }
}
