import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ApplicationEvent } from '../../../shared/application-command-events';

@Injectable()
export class ApplicationEventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishAll<EventType extends ApplicationEvent>(events: EventType[]): void {
    // eslint-disable-next-line array-callback-return
    events.map((e) => {
      // eslint-disable-next-line no-console
      console.log('[ApplicationEventBus] Event published', {
        stream: e.streamName.raw,
        type: e.type,
        id: e.id,
        data: e.data,
      });

      const event = `${e.streamName.streamCategory}.${e.type}`;

      this.eventEmitter.emit(event, e);
    });
  }
}
