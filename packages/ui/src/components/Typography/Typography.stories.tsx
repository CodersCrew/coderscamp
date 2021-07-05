import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { Typography, TypographyProps } from './Typography';

const tags = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6', a: 'a', span: 'span', p: 'p', div: 'div' };
const meta: Meta = {
  title: 'Typography',
  component: Typography,
  argTypes: {
    as: {
      options: Object.keys(tags),
      mapping: tags,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

const Template: Story<TypographyProps> = (args) => <Typography as="h1" size="md" weight="regular" {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'lorem ipsum dolor sit amet',
  as: 'h1',
  size: 'md',
  weight: 'regular',
};

export const Sizes = () => (
  <>
    <Typography size="xs">Extra small (xs)</Typography>
    <Typography size="sm">Small (sm)</Typography>
    <Typography size="md">Medium (md)</Typography>
    <Typography size="lg">Large (lg)</Typography>
    <Typography size="xl">Extra Large (xl)</Typography>
    <Typography size="2xl">Extra Large (2xl)</Typography>
    <Typography size="3xl">Extra Large (3xl)</Typography>
    <Typography size="4xl">Extra Large (4xl)</Typography>
    <Typography size="5xl">Extra Large (5xl)</Typography>
    <Typography size="6xl">Extra Large (6xl)</Typography>
    <Typography size="7xl">Extra Large (7xl)</Typography>
  </>
);

export const Variants = () => (
  <HStack>
    <Typography size="md" as="span">
      Span
    </Typography>
    <Typography size="xl" as="a" href="#">
      Link
    </Typography>
    <Typography size="md" as="p">
      Paragraph
    </Typography>
  </HStack>
);

export const FontWeights = () => (
  <>
    <Typography size="lg" as="p" weight="medium">
      Medium Weight
    </Typography>
    <Typography size="lg" as="p">
      Regular Weight
    </Typography>
  </>
);
