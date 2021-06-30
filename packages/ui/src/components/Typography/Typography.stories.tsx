import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Typography, BoxProps } from './Typography';
const meta: Meta = {
  title: 'Typography',
  component: Typography,
};

export default meta;

const Template: Story<BoxProps> = (args) => <Typography size="2xl" as="h1" weight="regular" {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'lorem ipsum dolor sit amet',
  as: 'h1',
  size: '2xl',
  weight: 'regular',
};

export const Sizes = () => (
  <>
    <Typography size="xs" as="h1">
      Extra small (xs)
    </Typography>
    <Typography size="sm" as="h1">
      Small (sm)
    </Typography>
    <Typography size="md" as="h1">
      Medium (md)
    </Typography>
    <Typography size="lg" as="h1">
      Large (lg)
    </Typography>
    <Typography size="xl" as="h1">
      Extra Large (xl)
    </Typography>
    <Typography size="2xl" as="h1">
      Extra Large (2xl)
    </Typography>
    <Typography fontSize="3xl" as="h1">
      Extra Large (3xl)
    </Typography>
    <Typography size="4xl" as="h1">
      Extra Large (4xl)
    </Typography>
    <Typography size="5xl" as="h1">
      Extra Large (5xl)
    </Typography>
    <Typography size="6xl" as="h1">
      Extra Large (6xl)
    </Typography>
    <Typography size="7xl" as="h1">
      Extra Large (7xl)
    </Typography>
  </>
);

export const Variants = () => (
  <>
    <Typography size="md" as="p">
      Paragraph
    </Typography>
    <Typography size="md" as="a" href="#">
      Link
    </Typography>
    <Typography size="md" as="div">
      Div
    </Typography>
    <Typography size="md" as="span">
      Span
    </Typography>{' '}
    <Typography size="md" as="span">
      Span
    </Typography>
  </>
);

export const FontWeights = () => (
  <>
    <Typography size="lg" as="p" weight="medium">
      Medium Weight
    </Typography>{' '}
    <Typography size="lg" as="p">
      Regular Weight
    </Typography>
  </>
);
