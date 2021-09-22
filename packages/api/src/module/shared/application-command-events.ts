import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';
import { EventStreamVersion } from '@/write/shared/application/event-stream-version';

import { DomainCommand } from './domain.command';
import { DomainEvent } from './domain.event';

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

export type EventGlobalOrder = number;

export interface ApplicationEvent<
  DomainEventType extends DomainEvent = DomainEvent,
  EventMetadata extends DefaultEventMetadata = DefaultEventMetadata,
> {
  readonly type: DomainEventType['type'];
  readonly id: string;
  readonly occurredAt: Date;
  readonly data: DomainEventType['data'];
  readonly metadata: EventMetadata;
  readonly streamVersion: EventStreamVersion;
  readonly streamName: EventStreamName;
  readonly globalOrder: EventGlobalOrder;
}
