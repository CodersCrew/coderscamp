import { createContext, useContext } from 'react';

type FieldSize = 'sm' | 'md' | 'lg';

export interface FieldContextValue {
  size: FieldSize;
}

export const defaultFieldContextValue = {
  size: 'md',
} as const;

const FieldContext = createContext<FieldContextValue>(defaultFieldContextValue);

export function useFieldContextSize(): FieldSize;
export function useFieldContextSize<Size extends FieldSize>(sizeProp: Size | undefined): Size;
export function useFieldContextSize<Size extends FieldSize, Excluded extends Exclude<FieldSize, 'md'>>(
  sizeProp: Size | undefined,
  exclude: Excluded,
): Size extends undefined ? 'md' : Size;
export function useFieldContextSize(sizeProp?: FieldSize, exclude?: Exclude<FieldSize, 'md'>) {
  const { size } = useContext(FieldContext);

  if (sizeProp) {
    return sizeProp;
  }

  if (!exclude) {
    return size;
  }

  return size === exclude ? defaultFieldContextValue.size : size;
}

export const { Provider: FieldContextProvider } = FieldContext;
