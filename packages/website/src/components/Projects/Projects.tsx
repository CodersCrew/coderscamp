import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { ProjectCard } from './ProjectCard';
import { projects } from './Projects.data';

export const Projects = () => {
  return (
    <Flex justifyContent="center" py={{ base: '40px', lg: '80px' }} px="16px">
      <VStack spacing={{ base: '32px', lg: '40px' }} w="1280px">
        <VStack spacing="32px" textAlign="center">
          <Typography size="4xl" color="gray.900" weight="extrabold">
            Przykładowe projekty z poprzedniej edycji
          </Typography>
          <Typography size="lg" color="gray.500">
            Podczas poprzedniej edycji CodersCamp zespoły stworzyły niemal 100 projektów. Jeśli zastanawiasz się, jak
            wygląda przykładowa aplikacja zakodowana na naszym kursie, poniżej możesz zapoznać się z kilkoma z nich.
            Pamiętaj że na CodersCamp to Ty wspólnie z zespołem ustalacie, co chcielibyście zaprogramować. W związku z
            tym Twoje portfolio projektowe po kursie może składać się z zupełnie innych aplikacji niż przedstawione
            poniżej.
          </Typography>
        </VStack>
        <HStack spacing="40px">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </HStack>
      </VStack>
    </Flex>
  );
};
