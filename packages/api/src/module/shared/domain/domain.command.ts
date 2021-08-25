export type DomainCommand<Type = string, Data = Record<string, unknown>> = {
  type: Type;
  data: Data;
};
