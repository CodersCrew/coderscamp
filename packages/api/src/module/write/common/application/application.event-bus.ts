import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ApplicationEvent } from '../../../shared/application-command-events';

@Injectable()
export class ApplicationEventBus {
  constructor(private readonly eventBus: EventBus, private readonly eventEmitter: EventEmitter2) {}

  publishAll<EventType extends ApplicationEvent>(events: EventType[]): void {
    console.log('Publishing events', events);
    events.map((e) => {
      this.eventEmitter.emit(`${e.streamName.streamCategory}.${e.type}`, e)
    });
    this.eventBus.publishAll(events);
  }
}
