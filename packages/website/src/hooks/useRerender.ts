import { useReducer } from 'react';

const rerenderReducer = (num: number): number => (num + 1) % 1_000_000;

export const useRerender = () => {
  const [, rerender] = useReducer(rerenderReducer, 0);

  return rerender;
};
