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

type NumberInputSize = 'sm' | 'md' | 'lg';

type NumberInputMode = 'numeric' | 'decimal';

export interface NumberInputProps extends Omit<HTMLChakraProps<'div'>, keyof UseNumberInputProps> {
  /**
   * Determines number input's paddings and height.
   */
  size: NumberInputSize;
  /**
   * Determines type of data that might be entered by the user (numeric or decimal).
   */
  inputMode?: NumberInputMode;
  /**
   * Determines if number input is disabled or not .
   */
  disabled?: boolean;
  value?: number;
  onChange?: (stringValue: string, numberValue: number) => void;
  max?: number;
  min?: number;
  precision?: number;
  step?: number;
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
    return (
      <ChakraNumberInput
        size={size}
        inputMode={inputMode}
        isDisabled={disabled}
        aria-describedby={ariaDescribedby}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        ref={ref}
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
