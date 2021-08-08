import React from 'react';
import {
  forwardRef,
  HTMLChakraProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  UseNumberInputProps,
} from '@chakra-ui/react';

import { useFieldContextSize } from '../FormControl/FieldContext';

type NumberInputSize = 'sm' | 'md' | 'lg';

type NumberInputMode = 'numeric' | 'decimal';

export interface NumberInputProps extends Omit<HTMLChakraProps<'div'>, keyof UseNumberInputProps> {
  /**
   * Determines number input's paddings and height
   */
  size?: NumberInputSize;
  /**
   * Determines type of data that might be entered by the user (numeric or decimal)
   */
  inputMode?: NumberInputMode;
  /**
   * Determines if number input is disabled or not
   */
  disabled?: boolean;
  /**
   * Determines number input value
   */
  value?: number;
  /**
   * The callback fired when the value changes
   */
  onChange?: (stringValue: string, numberValue: number) => void;
  /**
   * Determines the maximum value of the counter
   */
  max?: number;
  /**
   * Determines the minimum value of the counter
   */
  min?: number;
  /**
   * Determines the number of decimal points used to round the value
   */
  precision?: number;
  /**
   * Determines the step used to increment or decrement the value
   */
  step?: number;
  /**
   * Determines the initial value of the counter
   */
  defaultValue?: string | number;
}

export const NumberInput = forwardRef<NumberInputProps, 'input'>(
  (
    {
      size,
      inputMode = 'decimal',
      disabled = false,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref,
  ) => {
    const inputSize = useFieldContextSize(size);

    return (
      <ChakraNumberInput
        size={inputSize}
        inputMode={inputMode}
        isDisabled={disabled}
        aria-describedby={ariaDescribedby}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        ref={ref}
        width="100%"
        {...props}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    );
  },
);
