import React from 'react';

import { Center } from '@coderscamp/ui/components/Center';
import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { ExternalLink } from '../ExternalLink';
import { Section } from '../Section';
import { learningSources } from './LearningSources.data';

export const LearningSources = () => {
  return (
    <Section spacing={{ base: '32px', lg: '64px' }}>
      <VStack spacing="32px" textAlign="center">
        <Typography size="4xl" color="gray.900" weight="extrabold">
          Skąd będziesz czerpać wiedzę?
        </Typography>
        <Typography size="lg" color="gray.500">
          Na CodersCamp wierzymy, że nie ma sensu od zera opracowywać tematów, które już zostały jakościowo
          przedstawione przez kogoś innego. To właśnie dlatego do stworzenia naszego interaktywnego planu nauki poza
          własnymi materiałami wykorzystaliśmy niezliczoną ilość już istniejących źródeł. Gdybyś chciał wstępnie
          zapoznać się z nimi jeszcze przed CodersCamp, pod spodem znajdziesz listę części z nich.
        </Typography>
      </VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} spacing="4px" width="100%">
        {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
        {learningSources.map(({ name, url, image: Image }) => (
          <ExternalLink key={name} href={url} aria-label={`Przejdź na stronę ${name}`}>
            <Center
              bgColor="gray.50"
              borderRadius="8px"
              height="112px"
              px="32px"
              py="24px"
              transition="background-color 0.225s"
              _hover={{ bgColor: 'gray.100' }}
            >
              <Image width="100%" height="100%" maxW="216px" />
            </Center>
          </ExternalLink>
        ))}
      </SimpleGrid>
    </Section>
  );
};
