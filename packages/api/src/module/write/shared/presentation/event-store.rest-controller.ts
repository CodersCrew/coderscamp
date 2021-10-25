import {Controller, Get, Inject, Query, Sse} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Observable} from 'rxjs';

import {ApplicationEvent} from '@/module/application-command-events';
import {EVENT_REPOSITORY, EventRepository, ReadAllFilter} from '@/write/shared/application/event-repository';

// todo: some guards, filter events by user access
@Controller('event-store')
export class EventStoreRestController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
  ) {
  }

  @Get('/events')
  async getEvents(
    @Query() query: Partial<ReadAllFilter>,
  ): Promise<{ items: ApplicationEvent[]; metadata: { size: number } }> {
    const events = await this.eventRepository.readAll(query);

    return {items: events, metadata: {size: events.length}};
  }

  @Sse('/events')
  // sseOfEvents(@Query() query: Partial<{streamCategory: string}>) {
  sseOfEvents(): Observable<ServerSentEventResponseBody> {
    return new Observable((observer) => {
      this.eventEmitter.onAny((_, applicationEvent: ApplicationEvent) => observer.next({
        id: applicationEvent.globalOrder.toString(),
        data: applicationEvent,
        type: applicationEvent.type
      }));
    });
  }
}

export interface ServerSentEventResponseBody {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
