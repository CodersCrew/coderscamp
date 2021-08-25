import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ApplicationEvent } from '../../../shared/application-command-events';

@Injectable()
export class ApplicationEventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishAll<EventType extends ApplicationEvent>(events: EventType[]): void {
    events.map((e) => {
      // eslint-disable-next-line no-console
      console.log('[ApplicationEventBus] Event published', e);

      return this.eventEmitter.emit(`${e.streamName.streamCategory}.${e.type}`, e);
    });
  }
}
