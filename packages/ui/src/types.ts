export type { HTMLChakraProps } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

type HardOmit<Obj extends AnyObject, Key extends string> = Omit<Obj, Key> & Partial<Record<Key, never>>;

type FontProps = 'fontSize' | 'fontWeight' | 'letterSpacing' | 'lineHeight' | 'fontFamily';

export type SizeProps = 'w' | 'width' | 'maxW' | 'minW' | 'h' | 'height' | 'minH' | 'maxH';

export type OmitForbiddenProps<Obj extends AnyObject, AdditionalKey extends string = ''> = HardOmit<
  Obj,
  FontProps | AdditionalKey
>;
