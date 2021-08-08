import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { defaultFieldContextValue, FieldContextProvider, useFieldContextSize } from './FieldContext';

const SIZE_FROM_CONTEXT = 'sm';
const DEFAULT_SIZE = defaultFieldContextValue.size;
const SIZE_FROM_PROP = 'lg';

const wrapper = ({ children }: { children: ReactNode }) => {
  return <FieldContextProvider value={{ size: SIZE_FROM_CONTEXT }}>{children}</FieldContextProvider>;
};

describe('useFieldContextSize', () => {
  it('returns the `sizeProp` when provided', () => {
    const { result } = renderHook(() => useFieldContextSize(SIZE_FROM_PROP), { wrapper });

    expect(result.current).toBe(SIZE_FROM_PROP);
  });

  describe('when the `sizeProp` is not provided', () => {
    it('returns value from the context', () => {
      const { result } = renderHook(() => useFieldContextSize(), { wrapper });

      expect(result.current).toBe(SIZE_FROM_CONTEXT);
    });

    it('when there is no context returns the default value', () => {
      const { result } = renderHook(() => useFieldContextSize());

      expect(result.current).toBe(DEFAULT_SIZE);
    });

    it('when value derived from context is excluded returns the default value', () => {
      const { result } = renderHook(() => useFieldContextSize(undefined, SIZE_FROM_CONTEXT), { wrapper });

      expect(result.current).toBe(DEFAULT_SIZE);
    });

    it('when value derived from context is not excluded returns this value', () => {
      const { result } = renderHook(() => useFieldContextSize(undefined, 'lg'), { wrapper });

      expect(result.current).toBe(SIZE_FROM_CONTEXT);
    });
  });
});
