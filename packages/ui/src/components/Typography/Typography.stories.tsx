import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Typography, BoxProps } from './Typography';
const meta: Meta = {
  title: 'Typography',
  component: Typography,
};

export default meta;

const Template: Story<BoxProps> = (args) => <Typography fontSize="2xl" as="h1" fontWeight="regular" {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'lorem ipsum dolor sit amet',
  as: 'h1',
  fontSize: '2xl',
  fontWeight: 'regular',
};

export const Sizes = () => (
  <>
    <Typography fontSize="xs" as="h1">
      Extra small (xs)
    </Typography>
    <Typography fontSize="sm" as="h1">
      Small (sm)
    </Typography>
    <Typography fontSize="md" as="h1">
      Medium (md)
    </Typography>
    <Typography fontSize="lg" as="h1">
      Large (lg)
    </Typography>
    <Typography fontSize="xl" as="h1">
      Extra Large (xl)
    </Typography>
    <Typography fontSize="2xl" as="h1">
      Extra Large (2xl)
    </Typography>
    <Typography fontSize="3xl" as="h1">
      Extra Large (3xl)
    </Typography>
    <Typography fontSize="4xl" as="h1">
      Extra Large (4xl)
    </Typography>
    <Typography fontSize="5xl" as="h1">
      Extra Large (5xl)
    </Typography>
    <Typography fontSize="6xl" as="h1">
      Extra Large (6xl)
    </Typography>
    <Typography fontSize="7xl" as="h1">
      Extra Large (7xl)
    </Typography>
  </>
);

export const Variants = () => (
  <>
    <Typography fontSize="md" as="p">
      Paragraph
    </Typography>
    <Typography fontSize="md" as="a" href="#">
      Link
    </Typography>
    <Typography fontSize="md" as="div">
      Div
    </Typography>
    <Typography fontSize="md" as="span">
      Span
    </Typography>{' '}
    <Typography fontSize="md" as="span">
      Span
    </Typography>
  </>
);

export const FontWeights = () => (
  <>
    <Typography fontSize="lg" as="p" fontWeight='medium'>
      Medium Weight
    </Typography>{' '}
    <Typography fontSize="lg" as="p">
      Regular Weight
    </Typography>
  </>
);
