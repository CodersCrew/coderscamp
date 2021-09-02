import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { Section } from '../Section';

const ProjectsCarousel = dynamic(
  import('./ProjectsCarousel').then((mod) => mod.ProjectsCarousel) as Promise<ComponentType>,
  { ssr: false },
);

export const Projects = () => {
  return (
    <Section spacing={{ base: '32px', lg: '40px' }}>
      <VStack spacing="32px" textAlign="center">
        <Typography size="4xl" color="gray.900" weight="extrabold">
          Przykładowe projekty z poprzedniej edycji
        </Typography>
        <Typography size="lg" color="gray.500">
          Podczas poprzedniej edycji CodersCamp zespoły stworzyły niemal 100 projektów. Jeśli zastanawiasz się, jak
          wygląda przykładowa aplikacja zakodowana na naszym kursie, poniżej możesz zapoznać się z kilkoma z nich.
          Pamiętaj że na CodersCamp to Ty wspólnie z zespołem ustalacie, co chcielibyście zaprogramować. W związku z tym
          Twoje portfolio projektowe po kursie może składać się z zupełnie innych aplikacji niż przedstawione poniżej.
        </Typography>
      </VStack>
      <ProjectsCarousel />
    </Section>
  );
};
