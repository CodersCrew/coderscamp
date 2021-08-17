import React from 'react';
import { render, screen } from '@testing-library/react';

import { CheckboxGroup } from '../CheckboxGroup';
import { Input } from '../Input';
import { NumberInput } from '../NumberInput';
import { RadioGroup } from '../RadioGroup';
import { Textarea } from '../Textarea';
import { FormField } from '.';
import { getHelperTextProps, hasInvalidProp } from './FormField';

describe('FormField', () => {
  it('renders correctly', () => {
    render(
      <FormField>
        <Input placeholder="Test text" />
      </FormField>,
    );

    expect(screen.getByPlaceholderText('Test text')).toBeInTheDocument();
  });

  it('displays label when `label` prop provided', () => {
    const label = 'Label text';

    const { rerender } = render(
      <FormField>
        <Input />
      </FormField>,
    );

    expect(screen.queryByText(label)).not.toBeInTheDocument();

    rerender(
      <FormField label={label}>
        <Input />
      </FormField>,
    );

    expect(screen.queryByText(label)).toBeInTheDocument();
  });

  it('displays label with the `*` symbol when the `required` prop provided', () => {
    const label = 'Label text';

    const { rerender } = render(
      <FormField label={label}>
        <Input />
      </FormField>,
    );

    expect(screen.getByText(label)).not.toHaveTextContent(/\*+$/);

    rerender(
      <FormField label={label} required>
        <Input />
      </FormField>,
    );

    expect(screen.getByText(label)).toHaveTextContent(/\*+$/);
  });

  describe('getHelperTextProps', () => {
    const error = 'some error';
    const warning = 'some warning';
    const helper = 'some helper';

    it('returns null when any of `error`, `warning`, `helper` props provided', () => {
      expect(getHelperTextProps({})).toBe(null);
    });

    it('when only one of `error`, `warning`, `helper` props provided returns its value', () => {
      expect(getHelperTextProps({ error })).toEqual({ variant: 'error', children: error });
      expect(getHelperTextProps({ warning })).toEqual({ variant: 'warning', children: warning });
      expect(getHelperTextProps({ helper })).toEqual({ variant: 'default', children: helper });
    });

    it('returns value of the `error` prop always when provided', () => {
      expect(getHelperTextProps({ error, warning, helper })).toEqual({ variant: 'error', children: error });
    });

    it('returns value of the `warning` prop always when no `error` prop provided', () => {
      expect(getHelperTextProps({ warning, helper })).toEqual({ variant: 'warning', children: warning });
    });
  });

  describe('hasInvalidProp', () => {
    it('throws when there are no children', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => hasInvalidProp(null as any)).toThrowErrorMatchingInlineSnapshot(
        `"FormField component should have exactly one child"`,
      );
    });

    it('throws when children contain more than one element', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => hasInvalidProp([<Input key={1} />, <Input key={2} />] as any)).toThrowErrorMatchingInlineSnapshot(
        `"FormField component should have exactly one child"`,
      );
    });

    it('throws when element passed as `children` is not supported by the component', () => {
      expect(() => hasInvalidProp(<div />)).toThrowErrorMatchingInlineSnapshot(
        `"Unsupported FormField child element: undefined. Supported elements are: Input, Textarea, NumberInput, RadioGroup, CheckboxGroup"`,
      );
    });

    it('returns `true` for components that can receive the `invalid` prop', () => {
      expect(hasInvalidProp(<Input />)).toBe(true);
      expect(hasInvalidProp(<Textarea />)).toBe(true);
      expect(hasInvalidProp(<NumberInput />)).toBe(true);
    });

    it('returns `false` for components that cannot receive the `invalid` prop', () => {
      expect(hasInvalidProp(<RadioGroup name="x" value="y" onChange={() => {}} />)).toBe(false);
      expect(hasInvalidProp(<CheckboxGroup value={['x']} onChange={() => {}} />)).toBe(false);
    });
  });
});
