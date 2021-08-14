import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

import { Flex } from '@coderscamp/ui/components/Flex';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

const ProjectsCarousel = dynamic(
  import('./ProjectsCarousel').then((mod) => mod.ProjectsCarousel) as Promise<ComponentType>,
);

export const Projects = () => {
  return (
    <Flex justifyContent="center" py={{ base: '40px', lg: '80px' }} px={{ base: '16px', md: '24px', lg: '64px' }}>
      <VStack spacing={{ base: '32px', lg: '40px' }} maxW="min(1280px, 100%)">
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
        <ProjectsCarousel />
      </VStack>
    </Flex>
  );
};
