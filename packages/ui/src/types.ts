// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

type HardOmit<Obj extends AnyObject, Key extends string> = Omit<Obj, Key> & Partial<Record<Key, never>>;

type ForbiddenProps = 'fontSize' | 'fontWeight' | 'letterSpacing' | 'lineHeight' | 'fontFamily';

export type OmitForbiddenProps<Obj extends AnyObject, AdditionalKey extends string = ''> = HardOmit<
  Obj,
  ForbiddenProps | AdditionalKey
>;
