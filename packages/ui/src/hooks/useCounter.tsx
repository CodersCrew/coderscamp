import { useEffect } from 'react';
import { animate, AnimationOptions, useMotionValue } from 'framer-motion';

export const useCounter = (valueFrom: number, valueTo: number, animationOptions: AnimationOptions<number>) => {
  const value = useMotionValue(valueFrom);

  useEffect(() => {
    const controls = animate(value, valueTo, animationOptions);

    return controls.stop;
  }, []);

  return value;
};
