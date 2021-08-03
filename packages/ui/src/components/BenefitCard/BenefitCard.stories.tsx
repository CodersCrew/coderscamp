import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { SolidGitHubIcon } from '../../icons';
import { BenefitCard, BenefitCardProps } from './BenefitCard';

const meta: Meta = {
  title: 'Components / BenefitCard',
  component: BenefitCard,
};

export default meta;

const Template: Story<BenefitCardProps> = (args) => (
  <Box bg="white" p="48px">
    <BenefitCard {...args} />
  </Box>
);

export const Playground = Template.bind({});

Playground.args = {
  icon: <SolidGitHubIcon />,
  title: 'Push to Deploy',
  subtitle: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
};
