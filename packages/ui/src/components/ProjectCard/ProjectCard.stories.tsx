import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { ProjectCard, ProjectCardProps } from './ProjectCard';

const title = 'Zaawansowany React i Node';
const date = new Date();

const status = { done: 'done', idle: 'idle', doing: 'doing', review: 'review' };
const meta: Meta = {
  title: 'Components / ProjectCard',
  component: ProjectCard,
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

const Template: Story<ProjectCardProps> = (args) => (
  <SimpleGrid columns={4} spacing={5} h="444px">
    <ProjectCard {...args} />
  </SimpleGrid>
);

export const Playground = Template.bind({});

Playground.args = {
  status: 'done',
  image: 'test',
  title: 'Podstawy web developmentu',
  url: '/test',
  points: 100,
  pointsMax: 200,
};

export const Variants = () => (
  <SimpleGrid columns={4} spacing={3} h="444px" w="320">
    <ProjectCard status="idle" image="test" title={title} url="test" date={date} />
    <ProjectCard status="doing" image="test" title={title} url="test" date={date} />
    <ProjectCard status="review" image="test" title={title} url="test" date={date} />
    <ProjectCard status="done" image="test" title={title} url="test" points={100} pointsMax={200} />
  </SimpleGrid>
);
