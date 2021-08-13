import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { SolidGitHubIcon, SolidWindowIcon } from '@coderscamp/ui/icons';

import { Project } from './Projects.data';

interface ProjectCardProps {
  project: Project;
}

const buttonProps = {
  as: 'a',
  target: '_blank',
  variant: 'solid',
  color: 'default',
  flex: 1,
  size: 'sm',
} as const;

export const ProjectCard = ({ project: { name, description, gitHubUrl, demoUrl } }: ProjectCardProps) => {
  return (
    <VStack spacing="32px" p="24px" border="1px solid" borderColor="gray.300" borderRadius="8px" width="400px">
      <VStack spacing="12px" align="start">
        <Typography size="xl" weight="extrabold" color="gray.900">
          {name}
        </Typography>
        <Typography size="md" color="gray.500">
          {description}
        </Typography>
      </VStack>
      <HStack spacing="12px" width="100%">
        <Button {...buttonProps} href={gitHubUrl} icon={<SolidGitHubIcon />}>
          Zobacz kod
        </Button>
        <Button {...buttonProps} href={demoUrl} icon={<SolidWindowIcon />}>
          Otwórz aplikację
        </Button>
      </HStack>
    </VStack>
  );
};
