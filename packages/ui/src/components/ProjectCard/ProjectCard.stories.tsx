import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { ProjectCard, ProjectCardType } from './ProjectCard';

const title = 'Convallis tellus duis enim vulputate malesuada eget duis gravida sit.';

// const tags = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6', a: 'a', span: 'span', p: 'p', div: 'div' };
const meta: Meta = {
  title: 'Components / ProjectCard',
  component: ProjectCard,
};

export default meta;

const Template: Story<ProjectCardType> = (args) => <ProjectCard {...args} />;

export const Playground = Template.bind({});

// Playground.args = {
//   children: 'lorem ipsum dolor sit amet',
//   as: 'h1',
//   size: 'md',
//   weight: 'regular',
// };

export const Variants = () => (
  <HStack>
    <ProjectCard status="done" image="test" title={title} url="test" points={100} pointsMax={200} />
    <ProjectCard status="idle" image="test" title={title} url="test" date="21.11.22" />
    <ProjectCard status="review" image="test" title={title} url="test" date="21.11.22" />
    <ProjectCard status="doing" image="test" title={title} url="test" date="21.11.22" />
  </HStack>
);
