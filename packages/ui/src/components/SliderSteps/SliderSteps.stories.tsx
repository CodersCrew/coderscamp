import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { SliderSteps, SliderStepsProps } from './SliderSteps';

const meta: Meta = {
  title: 'Components / SliderSteps',
  component: SliderSteps,
};

export default meta;

const Template: Story<SliderStepsProps> = (args: SliderStepsProps) => <SliderSteps {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  count: 8,
  selectedIndex: 0,
};

export const Interactive = () => {
  const [selected, setSelectedIndex] = useState(0);

  return <SliderSteps count={8} selectedIndex={selected} onChange={setSelectedIndex} />;
};
