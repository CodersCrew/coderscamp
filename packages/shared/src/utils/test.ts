export const createObjectMock = <Value extends Record<string, unknown>>(obj: Partial<Value>): Value => obj as Value;
