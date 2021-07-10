import React, { ChangeEvent } from 'react';
import { forwardRef, HTMLChakraProps, Textarea as ChakraTextarea } from '@chakra-ui/react';

type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<HTMLChakraProps<'textarea'>, 'readonly'> {
  size?: TextareaSize;
  disabled?: boolean;
  onChange?: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
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

const getPadding = (size: TextareaSize) => {
  switch (size) {
    case 'sm':
      return 'sm';
    case 'md':
      return 'md';
    default:
      return 'lg';
  }
};

export const Textarea = forwardRef<TextareaProps, 'textarea'>(({ disabled = false, size = 'md', ...props }, ref) => (
  <ChakraTextarea
    isDisabled={disabled}
    {...props}
    ref={ref}
    size={size}
    padding={getPadding(size)}
    _focus={focusedStyles}
    _disabled={disableStyles}
    _hover={!disabled ? hoverStyles : {}}
  />
));
