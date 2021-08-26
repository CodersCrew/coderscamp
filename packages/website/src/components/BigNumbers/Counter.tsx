import { createRef, useEffect, useState } from 'react';
import { useInViewport } from 'react-in-viewport';

import { Typography, TypographyProps } from '@coderscamp/ui/components/Typography';
import { useCounter } from '@coderscamp/ui/hooks/useCounter';

interface AnimatedCounterProps extends Omit<TypographyProps, 'children'> {
  valueFrom?: number;
  valueTo: string;
  totalDuration?: number;
}

const options = {};

function digitsInValue(value: string) {
  return Number(value.match(/\d+/g)?.join('')) || 0;
}

function postfixInValue(value: string) {
  return String(value.match(/\D+/) || '');
}

function thousandsSeparator(value: string) {
  const segmentedValue = value
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g);

  if (!segmentedValue) return value;

  return segmentedValue
    .map((val) => val.split('').reverse().join(''))
    .reverse()
    .join(' ');
}

export const Counter = ({ valueFrom = 0, valueTo, totalDuration = 2.5, ...props }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState('');
  const [postfix, setPostfix] = useState('');
  const myRef = createRef<HTMLSpanElement>();
  const { inViewport } = useInViewport(myRef, options, { disconnectOnLeave: false }, []);

  function updateState(latest: number) {
    const formattedValue = thousandsSeparator(String(latest.toFixed(0)));

    setDisplayValue(formattedValue + postfix);
  }
  useCounter(valueFrom, digitsInValue(valueTo), { duration: totalDuration, onUpdate: updateState });

  useEffect(() => {
    setPostfix(postfixInValue(valueTo));
  }, [valueTo]);

  // useEffect(() => {
  //   if (inViewport) {
  //   }
  // }, [valueFrom, valueTo, totalDuration, inViewport]);

  return (
    <span ref={myRef}>
      <Typography {...props}>{`${displayValue}${postfix}`}</Typography>
    </span>
  );
};
