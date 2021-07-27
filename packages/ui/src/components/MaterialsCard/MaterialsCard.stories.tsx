import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { MaterialsCard, MaterialsCardProps } from './MaterialsCard';

const status = { idle: 'idle', loading: 'loading', generated: 'generated' };

const meta: Meta = {
  title: 'Components / MaterialsCard',
  component: MaterialsCard,
  argTypes: {
    status: {
      options: Object.keys(status),
      mapping: status,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

const Template: Story<MaterialsCardProps> = (args) => <MaterialsCard {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  status: 'idle',
};

export const Variants = () => (
  <HStack>
    <MaterialsCard status="idle" />
    <MaterialsCard status="loading" />
    <MaterialsCard status="generated" />
  </HStack>
);
