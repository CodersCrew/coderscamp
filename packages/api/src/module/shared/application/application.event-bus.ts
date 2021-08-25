import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { ApplicationEvent } from './application-command-events';

@Injectable()
export class ApplicationEventBus extends EventBus<ApplicationEvent> {
  getEventName = (event: ApplicationEvent): string => event.type;

  publishAll<T extends ApplicationEvent>(events: T[]): any {
    return super.publishAll(events);
  }
}
