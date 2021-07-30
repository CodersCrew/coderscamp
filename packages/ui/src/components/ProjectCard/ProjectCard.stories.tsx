import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { ProjectCardProps } from '.';
import { ProjectCard } from './ProjectCard';

const title = 'Zaawansowany React i Node';
const dateProps = new Date();
const image =
  'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1548&q=80';

const status = { done: 'done', idle: 'idle', doing: 'doing', review: 'review' };
const meta: Meta = {
  title: 'Components / ProjectCard',
  component: ProjectCard,
  argTypes: {
    date: {
      control: { type: 'date' },
    },
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

const Template: Story<ProjectCardProps> = (args) => (
  <Box w="320px" h="388px">
    <ProjectCard {...args} />
  </Box>
);

export const Playground = Template.bind({});

Playground.args = {
  status: 'idle',
  image,
  title: 'Podstawy web developmentu',
  url: '/test',
  date: dateProps,
};

export const Variants = () => (
  <SimpleGrid columns={4} spacing={5} h="444px">
    <ProjectCard status="idle" image={image} title={title} url="test" date={dateProps} />
    <ProjectCard status="doing" image={image} title={title} url="test" date={dateProps} />
    <ProjectCard status="review" image={image} title={title} url="test" date={dateProps} />
    <ProjectCard status="done" image={image} title={title} url="test" points={150} pointsMax={250} />
  </SimpleGrid>
);
