export type DefaultCommandMetadata = { correlationId: string; causationId?: string };
export type DefaultEventMetadata = { correlationId: string; causationId: string };

export interface DomainCommand<
  CommandData extends Record<string, unknown> = Record<string, unknown>,
  CommandMetadata extends DefaultCommandMetadata = DefaultCommandMetadata,
> {
  readonly type: string;
  readonly id: string;
  readonly issuedAt: Date;
  readonly data: CommandData;
  readonly metadata: CommandMetadata;
}

export interface DomainEvent<
  EventData extends Record<string, unknown> = Record<string, unknown>,
  EventMetadata extends DefaultEventMetadata = DefaultEventMetadata,
> {
  readonly type: string;
  readonly id: string;
  readonly occurredAt: Date;
  readonly data: EventData;
  readonly metadata: EventMetadata;
}
