import React, { Children, cloneElement, ReactElement, useMemo } from 'react';

import { FormControl, FormControlProps } from '../FormControl';
import { HelperText, HelperTextProps } from '../HelperText';
import { Label } from '../Label';

export interface FormFieldProps extends FormControlProps {
  label?: string;
  required?: boolean;
  error?: string | null;
  warning?: string | null;
  helper?: string | null;
  children: ReactElement;
}

const componentsWithInvalidState = ['Input', 'Textarea', 'NumberInput'];
const validChildren = [...componentsWithInvalidState, 'RadioGroup', 'CheckboxGroup'];

export const hasInvalidProp = (children: FormFieldProps['children']) => {
  if (Children.count(children) !== 1) {
    throw new Error('FormField component should have exactly one child');
  }

  const childrenType = Object(children.type);
  const hasDisplayName = 'displayName' in childrenType;

  if (!hasDisplayName || !validChildren.includes(childrenType.displayName)) {
    const validElements = validChildren.join(', ');

    throw new Error(
      `Unsupported FormField child element: ${childrenType.displayName}. Supported elements are: ${validElements}`,
    );
  }

  return componentsWithInvalidState.includes(childrenType.displayName);
};

export const getHelperTextProps = (
  texts: Pick<FormFieldProps, 'error' | 'warning' | 'helper'>,
): HelperTextProps | null => {
  const { error, warning, helper } = texts;

  if (error) {
    return { variant: 'error', children: error };
  }

  if (warning) {
    return { variant: 'warning', children: warning };
  }

  if (helper) {
    return { variant: 'default', children: helper };
  }

  return null;
};

export const FormField = ({ label, required, error, warning, helper, children, ...props }: FormFieldProps) => {
  const withInvalidProp = useMemo(() => hasInvalidProp(children), [children]);
  const helperTextProps = getHelperTextProps({ error, warning, helper });

  return (
    <FormControl {...props}>
      {label && <Label required={required}>{label}</Label>}
      {withInvalidProp ? cloneElement(children, { invalid: Boolean(error) }) : children}
      {helperTextProps && <HelperText {...helperTextProps} />}
    </FormControl>
  );
};
