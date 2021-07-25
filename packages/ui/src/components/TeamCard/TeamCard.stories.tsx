import React from 'react';
import { Meta, Story } from '@storybook/react';

import { TeamCard, TeamCardProps } from './TeamCard';
import { members, mentors } from './teamMembers';

const meta: Meta = {
  title: 'Components / TeamCard',
  component: TeamCard,
};

export default meta;

const Template: Story<TeamCardProps> = (args) => <TeamCard {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  members,
  mentors,
  active: true,
  width: '376px',
};
