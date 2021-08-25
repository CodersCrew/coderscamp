export type DomainEvent<Type = string, Data = Record<string, unknown>> = {
  type: Type;
  data: Data;
};
