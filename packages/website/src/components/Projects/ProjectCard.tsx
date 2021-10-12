import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidGitHubIcon, SolidWindowIcon } from '@coderscamp/ui/icons';

import { externalLinkBaseProps } from '../ExternalLink';
import { Project } from './Projects.data';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const buttonHasIcon = useBreakpointValue({ base: true, md: true, lg: true });
  const buttonsDirection = useBreakpointValue({ base: 'column', sm: 'row', md: 'column', lg: 'row' } as const);
  const buttonSize = useBreakpointValue({ base: 'md', md: 'sm' } as const);

  const buttonProps = {
    ...externalLinkBaseProps,
    as: 'a',
    variant: 'solid',
    color: 'default',
    size: buttonSize,
    width: { base: '100%', sm: 'max(164px)' },
  } as const;

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
      <Stack
        spacing="12px"
        pt="32px"
        mt="auto"
        justifyContent="center"
        alignItems="center"
        direction={buttonsDirection}
      >
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
