import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { animate, useMotionValue } from 'framer-motion';

import { Typography, TypographyProps } from '../Typography';

interface AnimatedCounterProps extends Omit<TypographyProps, 'children'> {
  valueFrom?: number;
  valueTo: string;
  totalDuration?: number;
}

function digitsInString(value: string) {
  return Number(value.match(/\d+/g)?.join('')) || 0;
}

function postfixInString(value: string) {
  return String(value.match(/\D+/) || '');
}

function addThousandsSeparator(value: string) {
  return value
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    ?.map((val) => val.split('').reverse().join(''))
    .reverse()
    .join(' ');
}

export const Counter = ({ valueFrom = 0, valueTo, totalDuration = 2, ...props }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [postfix, setPostfix] = useState('');
  const startingValue = useMotionValue(valueFrom);
  const { ref, inView } = useInView({ threshold: 1 });

  function updateState(latest: number) {
    const formattedValue = addThousandsSeparator(String(latest.toFixed(0)));

    setDisplayValue(formattedValue + postfix);
  }

  useEffect(() => {
    setPostfix(postfixInString(valueTo));
  }, [valueTo]);

  useEffect(() => {
    if (inView) {
      const { stop } = animate(startingValue, digitsInString(valueTo), {
        duration: totalDuration,
        onUpdate: updateState,
      });

      return stop;
    }
  }, [inView, startingValue, totalDuration, valueTo]);

  return (
    <Typography ref={ref} {...props}>
      {displayValue}
    </Typography>
  );
};
