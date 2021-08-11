import {TimeProvider} from "../core/time-provider";

export class FrozenTimeProvider implements TimeProvider {
  constructor(private time: Date) {
  }

  currentTime(): Date {
    return this.time;
  }

  timeTravelTo(newTime: Date){
    this.time = newTime
  }
}
