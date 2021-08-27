export function isNotNil<TValue>(value: TValue | null | undefined): value is TValue {
  return !(value === null || value === undefined);
}

export type Unwrap<Type> = Type extends Promise<infer U>
  ? U
  : Type extends (...args: never) => Promise<infer U>
  ? U
  : Type extends (...args: never) => infer U
  ? U
  : Type;
