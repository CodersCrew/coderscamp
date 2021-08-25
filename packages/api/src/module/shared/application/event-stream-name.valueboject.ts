export const EVENT_STREAM_GROUP_SEPARATOR = '_';

export class EventStreamName {
  private constructor(readonly streamGroup: string, readonly streamId: string) {}

  static from(streamGroup: string, streamId: string) {
    if (streamGroup === undefined || streamGroup === '' || streamId === undefined || streamId === '') {
      throw new Error(
        `EventStreamName must follow format: "streamGroup${EVENT_STREAM_GROUP_SEPARATOR}streamId". Actual: ${streamGroup}${EVENT_STREAM_GROUP_SEPARATOR}${streamId}`,
      );
    }

    if (streamGroup.includes(EVENT_STREAM_GROUP_SEPARATOR)) {
      throw new Error(`Stream group cannot include ${EVENT_STREAM_GROUP_SEPARATOR}. Actual: ${streamGroup}`);
    }

    return new EventStreamName(streamGroup, streamId);
  }

  static fromRaw(raw: string) {
    const streamGroup = raw.substr(0, raw.indexOf(EVENT_STREAM_GROUP_SEPARATOR));
    const streamId = raw.substr(raw.indexOf(EVENT_STREAM_GROUP_SEPARATOR) + 1);

    if (streamGroup === undefined || streamGroup === '') {
      throw new Error(
        `EventStreamName must follow format: "streamGroup${EVENT_STREAM_GROUP_SEPARATOR}streamId". Actual: ${raw}`,
      );
    }

    return new EventStreamName(streamGroup, streamId);
  }

  static props(props: { streamGroup: string; streamId: string }) {
    return EventStreamName.from(props.streamGroup, props.streamId);
  }

  forSnapshot(): EventStreamName {
    return new EventStreamName(this.streamGroup, `${this.streamId}-` + `snapshots`);
  }

  get raw() {
    return `${this.streamGroup}${EVENT_STREAM_GROUP_SEPARATOR}${this.streamId}`;
  }
}
