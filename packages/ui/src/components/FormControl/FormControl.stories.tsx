import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';
import { HelperText } from '../HelperText';
import { Input } from '../Input';
import { Label } from '../Label';
import { NumberInput } from '../NumberInput';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { FormControl, FormControlProps } from './FormControl';

const meta: Meta = {
  title: 'Components / FormControl',
  component: FormControl,
  argTypes: {
    spacings: { control: false },
    children: { control: false },
  },
};

export default meta;

const Template: Story<FormControlProps> = ({ children, ...args }) => {
  return (
    <FormControl width="320px" {...args}>
      <Label>Label</Label>
      {children}
      <HelperText>Helper text content</HelperText>
    </FormControl>
  );
};

export const WithInput = Template.bind({});

WithInput.args = {
  size: 'md',
  children: <Input />,
};

export const WithNumberInput = Template.bind({});

WithNumberInput.args = {
  size: 'md',
  children: <NumberInput />,
};

export const WithRadioGroup = Template.bind({});

WithRadioGroup.args = {
  size: 'md',
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
  size: 'md',
  children: (
    <CheckboxGroup value={['checkbox1']} onChange={() => {}}>
      <Checkbox value="checkbox1">Checkbox 1 text</Checkbox>
      <Checkbox value="checkbox2">Checkbox 2 text</Checkbox>
      <Checkbox value="checkbox3">Checkbox 3 text</Checkbox>
    </CheckboxGroup>
  ),
};
