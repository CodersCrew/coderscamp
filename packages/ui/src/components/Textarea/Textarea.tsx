import React, { ChangeEventHandler } from 'react';
import { forwardRef, HTMLChakraProps, Textarea as ChakraTextarea } from '@chakra-ui/react';

type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<HTMLChakraProps<'textarea'>, 'readonly'> {
  size?: TextareaSize;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value?: string;
  isInvalid?: boolean;
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

export const Textarea = forwardRef<TextareaProps, 'textarea'>(({ disabled = false, size = 'md', ...props }, ref) => (
  <ChakraTextarea
    isDisabled={disabled}
    {...props}
    ref={ref}
    size={size}
    errorBorderColor="red.500"
    _focus={focusedStyles}
    _disabled={disableStyles}
    _hover={!disabled && hoverStyles}
  />
));
