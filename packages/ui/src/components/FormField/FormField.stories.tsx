import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';
import { Input } from '../Input';
import { NumberInput } from '../NumberInput';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Textarea } from '../Textarea';
import { FormField, FormFieldProps } from './FormField';

const meta: Meta = {
  title: 'Components / FormField',
  component: FormField,
  argTypes: {
    children: { control: false },
    error: { control: 'text' },
    warning: { control: 'text' },
    helper: { control: 'text' },
  },
};

export default meta;

const Template: Story<FormFieldProps> = (args) => <FormField width="320px" {...args} />;

const defaultArgs = {
  size: 'md',
  label: 'Label',
  required: false,
  error: '',
  warning: '',
  helper: '',
} as const;

export const WithInput = Template.bind({});

WithInput.args = {
  ...defaultArgs,
  children: <Input />,
};

export const WithTextarea = Template.bind({});

WithTextarea.args = {
  ...defaultArgs,
  children: <Textarea />,
};

export const WithNumberInput = Template.bind({});

WithNumberInput.args = {
  ...defaultArgs,
  children: <NumberInput />,
};

export const WithRadioGroup = Template.bind({});

WithRadioGroup.args = {
  ...defaultArgs,
  children: (
    <RadioGroup name="radio-group" value="radio1" onChange={() => {}}>
      <Radio value="radio1">Radio 1 text</Radio>
      <Radio value="radio2">Radio 2 text</Radio>
      <Radio value="radio3">Radio 3 text</Radio>
    </RadioGroup>
  ),
};

export const WithCheckboxGroup = Template.bind({});

WithCheckboxGroup.args = {
  ...defaultArgs,
  children: (
    <CheckboxGroup value={['checkbox1']} onChange={() => {}}>
      <Checkbox value="checkbox1">Checkbox 1 text</Checkbox>
      <Checkbox value="checkbox2">Checkbox 2 text</Checkbox>
      <Checkbox value="checkbox3">Checkbox 3 text</Checkbox>
    </CheckboxGroup>
  ),
};
