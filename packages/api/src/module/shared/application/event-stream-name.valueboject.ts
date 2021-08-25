export const EVENT_STREAM_CATEGORY_SEPARATOR = '_';

export class EventStreamName {
  private constructor(readonly streamCategory: string, readonly streamId: string) {}

  static from(streamCategory: string, streamId: string) {
    if (streamCategory === undefined || streamCategory === '' || streamId === undefined || streamId === '') {
      throw new Error(
        `EventStreamName must follow format: "streamCategory${EVENT_STREAM_CATEGORY_SEPARATOR}streamId". Actual: ${streamCategory}${EVENT_STREAM_CATEGORY_SEPARATOR}${streamId}`,
      );
    }

    if (streamCategory.includes(EVENT_STREAM_CATEGORY_SEPARATOR)) {
      throw new Error(`Stream category cannot include ${EVENT_STREAM_CATEGORY_SEPARATOR}. Actual: ${streamCategory}`);
    }

    return new EventStreamName(streamCategory, streamId);
  }

  static fromRaw(raw: string) {
    const streamCategory = raw.substr(0, raw.indexOf(EVENT_STREAM_CATEGORY_SEPARATOR));
    const streamId = raw.substr(raw.indexOf(EVENT_STREAM_CATEGORY_SEPARATOR) + 1);

    if (streamCategory === undefined || streamCategory === '') {
      throw new Error(
        `EventStreamName must follow format: "streamCategory${EVENT_STREAM_CATEGORY_SEPARATOR}streamId". Actual: ${raw}`,
      );
    }

    return new EventStreamName(streamCategory, streamId);
  }

  static props(props: { streamCategory: string; streamId: string }) {
    return EventStreamName.from(props.streamCategory, props.streamId);
  }

  get raw() {
    return `${this.streamCategory}${EVENT_STREAM_CATEGORY_SEPARATOR}${this.streamId}`;
  }
}
