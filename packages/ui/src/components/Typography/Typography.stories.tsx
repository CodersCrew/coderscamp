import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack, VStack } from '../Stack';
import { Typography, TypographyProps } from './Typography';

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'p', 'div'];
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'];

const meta: Meta = {
  title: 'Components / Typography',
  component: Typography,
  argTypes: {
    as: {
      control: { type: 'select' },
      options: tags,
    },
    size: {
      control: { type: 'select' },
      options: sizes,
    },
  },
};

export default meta;

const Template: Story<TypographyProps> = (args) => <Typography as="h1" size="md" weight="normal" {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'lorem ipsum dolor sit amet',
  as: 'h1',
  size: 'md',
  weight: 'normal',
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
    <Typography size="8xl">Extra Large (8xl)</Typography>
  </>
);

export const Variants = () => (
  <HStack>
    <Typography as="span">Span</Typography>
    <Typography as="a" href="#">
      Link
    </Typography>
    <Typography as="p">Paragraph</Typography>
  </HStack>
);

export const FontWeights = () => (
  <VStack>
    <Typography>Regular Weight</Typography>
    <Typography weight="medium">Medium Weight</Typography>
    <Typography weight="bold">Bold Weight</Typography>
    <Typography weight="extrabold">Extra Bold Weight</Typography>
  </VStack>
);
