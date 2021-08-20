export interface Event<Payload extends Record<string, unknown> = Record<string, unknown>> {
  readonly id: string;
  readonly occurredAt: Date;
  readonly payload: Payload;
}
