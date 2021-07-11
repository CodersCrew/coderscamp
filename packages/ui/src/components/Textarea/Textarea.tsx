import React, { ChangeEventHandler } from 'react';
import { forwardRef, HTMLChakraProps, Textarea as ChakraTextarea } from '@chakra-ui/react';

type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<HTMLChakraProps<'textarea'>, 'readonly'> {
  size?: TextareaSize;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string;
  value?: string;
  name?: string;
  invalid?: boolean;
}

const focusedStyles = {
  boxShadow: 'outline',
};

const disableStyles = {
  opacity: '0.4',
};

const hoverStyles = {
  borderColor: 'gray.400',
};

export const Textarea = forwardRef<TextareaProps, 'textarea'>(
  ({ disabled = false, invalid = false, ...props }, ref) => (
    <ChakraTextarea
      isDisabled={disabled}
      {...props}
      ref={ref}
      isInvalid={invalid}
      _focus={focusedStyles}
      _disabled={disableStyles}
      _hover={!disabled ? hoverStyles : {}}
    />
  ),
);
