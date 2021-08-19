import { EventStreamName } from './event-stream-name.valueboject';
import { DomainEvent } from './slices';

export type DomainCommand = (previousEvents: DomainEvent[]) => DomainEvent[];
export type EventStream<EventType extends DomainEvent = DomainEvent> = EventType[];
export type EventStreamVersion = number;

export const APPLICATION_SERVICE = Symbol('APPLICATION_SERVICE');

export interface ApplicationService {
  execute(streamName: EventStreamName, command: DomainCommand): Promise<void>;
}

/**
 import { EventStorage } from '../../api/event-storage';
 import * as moment from 'moment';
 import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
 import { StorageEventEntry } from '../../api/storage-event-entry';
 import { Time } from '../../time.type';
 import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';

 export class InMemoryEventStorage implements EventStorage {
  private eventStreams: { [key: string]: StorageEventEntry[] } = {};

  constructor(private readonly time: Time) {}

  store(
    eventStreamName: EventStreamName,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    const foundStream = this.eventStreams[eventStreamName.raw];
    if (foundStream && foundStream.find(e => e.eventId === event.eventId)) {
      return Promise.reject(new Error(`Event stream already contains this event with id ${event.eventId}!`));
    }
    const aggregateEvents = !foundStream ? 0 : foundStream.length;
    if (!foundStream) {
      if (expectedVersion && expectedVersion.raw !== 0) {
        return Promise.reject(new Error(`Event stream for aggregate was modified concurrently!`));
      }
      this.eventStreams[eventStreamName.raw] = [event];
    } else {
      if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
        return Promise.reject(new Error(`Event stream for aggregate was modified concurrently!`));
      }
      this.eventStreams[eventStreamName.raw].push(event);
    }
    return Promise.resolve();
  }

  storeAll(
    eventStreamName: EventStreamName,
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    return Promise.all(
      events
        .filter(event => event.streamId === eventStreamName.streamId)
        .map((value, index) =>
          this.store(
            eventStreamName,
            value,
            expectedVersion ? EventStreamVersion.exactly(expectedVersion.raw + index) : expectedVersion,
          ),
        ),
    ).then();
  }

  readEvents(eventStreamName: EventStreamName, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    const events = this.getEventsBy(eventStreamName).filter(it =>
      moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
    );
    return Promise.resolve(events);
  }

  private getEventsBy(eventStreamName: EventStreamName): StorageEventEntry[] {
    return this.eventStreams[eventStreamName.raw] || [];
  }
}



 export class TypeOrmEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    @InjectRepository(DomainEventEntity)
    private readonly typeOrmRepository: Repository<DomainEventEntity>,
  ) {}

  async store(
    eventStreamName: EventStreamName,
    event: StorageEventEntry,
    expectedVersion?: EventStreamVersion,
  ): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { streamId: eventStreamName.streamId },
    });
    if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
      throw new Error(`Event stream for aggregate was modified concurrently!`);
    }
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmDomainEvent = DomainEventEntity.fromProps({
      ...event,
      order: nextEventOrder,
    });
    return this.typeOrmRepository.save(typeOrmDomainEvent).then();
  }

  async storeAll(eventStreamName: EventStreamName, events: StorageEventEntry[]): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { streamId: eventStreamName.streamId },
    });
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmEvents = events
      .filter(event => event.streamId === eventStreamName.streamId)
      .map((e, i) => DomainEventEntity.fromProps({ ...e, order: nextEventOrder + i }));
    return this.typeOrmRepository.save(typeOrmEvents).then();
  }

  readEvents(eventStreamName: EventStreamName, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.typeOrmRepository
      .find({ where: { streamId: eventStreamName.streamId } }) // TODO: Query with occurredAt
      .then(found => found.filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate))));
  }
}

 protected recreateEventFromStorage(event: StorageEventEntry): DomainEvent {
    try {
      return new InvitingApplicantsDomainEvents[event.eventType](
        DomainEventId.of(event.eventId),
        event.occurredAt,
        ApplicantInvitationId.of(event.streamId),
        event.data,
      );
    } catch (error) {
      throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
    }
  }

 export const InvitingApplicantsDomainEvents = {
  ApplicantInvited,
  InvitingApplicantFailed,
  InvitationCancelled,
  CancelingApplicantInvitationFailed,
};
 */
