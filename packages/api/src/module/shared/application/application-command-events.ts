import { DomainCommand } from '../domain/domain.command';
import { DomainEvent } from '../domain/domain.event';
import { EventStreamVersion } from './slice.types';

export type DefaultCommandMetadata = { correlationId: string; causationId?: string };
export type DefaultEventMetadata = { correlationId: string; causationId?: string };

export interface ApplicationCommand<
  CommandType extends string = string,
  CommandData extends Record<string, unknown> = Record<string, unknown>,
  CommandMetadata extends DefaultCommandMetadata = DefaultCommandMetadata,
> {
  readonly type: CommandType;
  readonly id: string;
  readonly issuedAt: Date;
  readonly data: CommandData;
  readonly metadata: CommandMetadata;
}

export abstract class AbstractApplicationCommand<
  DomainCommandType extends DomainCommand,
  CommandMetadata extends DefaultCommandMetadata = DefaultCommandMetadata,
> implements ApplicationCommand<DomainCommandType['type'], DomainCommandType['data']>
{
  readonly type: DomainCommandType['type'];

  readonly id: string;

  readonly issuedAt: Date;

  readonly data: DomainCommandType['data'];

  readonly metadata: CommandMetadata;

  constructor(
    type: DomainCommandType['type'],
    id: string,
    issuedAt: Date,
    data: DomainCommandType['data'],
    metadata: CommandMetadata,
  ) {
    this.data = data;
    this.id = id;
    this.issuedAt = issuedAt;
    this.metadata = metadata;
    this.type = type;
  }
}

export interface ApplicationEvent<
  EventType extends string = string,
  EventData extends Record<string, unknown> = Record<string, unknown>,
  EventMetadata extends DefaultEventMetadata = DefaultEventMetadata,
> {
  readonly type: EventType;
  readonly id: string;
  readonly occurredAt: Date;
  readonly data: EventData;
  readonly metadata: EventMetadata;
  readonly streamVersion: EventStreamVersion;
}

export abstract class AbstractApplicationEvent<
  DomainEventType extends DomainEvent = DomainEvent,
  EventMetadata extends DefaultEventMetadata = DefaultEventMetadata,
> implements ApplicationEvent<DomainEventType['type'], DomainEventType['data'], EventMetadata>
{
  readonly type: DomainEventType['type'];

  readonly id: string;

  readonly occurredAt: Date;

  readonly data: DomainEventType['data'];

  readonly metadata: EventMetadata;

  readonly streamVersion: EventStreamVersion;

  constructor(
    type: DomainEventType['type'],
    id: string,
    occurredAt: Date,
    data: DomainEventType['data'],
    metadata: EventMetadata,
    streamVersion: EventStreamVersion,
  ) {
    this.data = data;
    this.id = id;
    this.occurredAt = occurredAt;
    this.metadata = metadata;
    this.type = type;
    this.streamVersion = streamVersion;
  }
}
