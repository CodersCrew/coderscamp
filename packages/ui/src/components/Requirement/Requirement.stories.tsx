import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Requirement, RequirementProps } from './Requirement';

const meta: Meta = {
  title: 'Components / Requirement',
  component: Requirement,
};

export default meta;

const Template: Story<RequirementProps> = (args: RequirementProps) => <Requirement {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children:
    'Quam mattis ut nec amet, eget quisque. Lectus in ac orci magna euismod velit. Aenean pellentesque gravida ac gravida sit.',
};
