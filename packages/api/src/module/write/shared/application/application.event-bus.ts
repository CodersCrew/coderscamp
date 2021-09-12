import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ApplicationEvent } from '@/module/application-command-events';

@Injectable()
export class ApplicationEventBus {
  private readonly logger = new Logger(ApplicationEventBus.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publishAll<EventType extends ApplicationEvent>(events: EventType[]): Promise<void> {
    await Promise.all(
      events.map((e) => {
        const event = `${e.streamName.streamCategory}.${e.type}`;

        this.logger.log(`Publishing event(${e.id}) of type ${event}`);

        return this.eventEmitter.emitAsync(event, e);
      }),
    );
  }
}
