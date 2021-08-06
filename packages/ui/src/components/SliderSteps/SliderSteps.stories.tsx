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
  selectedIdx: 0,
};

export const Interactive = () => {
  const [selected, setSelectedIdx] = useState(0);

  return <SliderSteps count={8} selectedIdx={selected} onChangeIdx={setSelectedIdx} />;
};
