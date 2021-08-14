import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidGitHubIcon, SolidWindowIcon } from '@coderscamp/ui/icons';

import { Project } from './Projects.data';

interface ProjectCardProps {
  project: Project;
  isSmallMobile: boolean;
}

const buttonProps = {
  as: 'a',
  target: '_blank',
  variant: 'solid',
  color: 'default',
  flex: 1,
  size: 'sm',
} as const;

export const ProjectCard = ({ project, isSmallMobile }: ProjectCardProps) => {
  const buttonHasIcon = useBreakpointValue({ base: true, md: false, lg: true });

  return (
    <Flex direction="column" p="24px" h="100%" border="1px solid" borderColor="gray.300" borderRadius="8px">
      <VStack spacing="12px" align="start">
        <Typography size="xl" weight="extrabold" color="gray.900">
          {project.name}
        </Typography>
        <Typography size="md" color="gray.500">
          {project.description}
        </Typography>
      </VStack>
      <Stack spacing="12px" width="100%" pt="32px" mt="auto" direction={isSmallMobile ? 'column' : 'row'}>
        <Button {...buttonProps} href={project.gitHubUrl} icon={buttonHasIcon ? <SolidGitHubIcon /> : undefined}>
          Zobacz kod
        </Button>
        <Button {...buttonProps} href={project.demoUrl} icon={buttonHasIcon ? <SolidWindowIcon /> : undefined}>
          Otwórz aplikację
        </Button>
      </Stack>
    </Flex>
  );
};
