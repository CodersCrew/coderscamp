import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Logo } from '@coderscamp/ui/components/Logo';
import { Typography } from '@coderscamp/ui/components/Typography';

import { SolidGitHubIcon } from '../../../ui/src/icons/SolidGitHub';

export const SignUpPageForCandidates = () => {
  return (
    <Flex
      direction="column"
      align="center"
      h={{
        base: '100%',
        md: '50%',
        xl: '90vh',
      }}
      mt={['2rem', '-1rem', '3rem', '5rem']}
    >
      <Flex
        direction="column"
        align="center"
        justify="space-evenly"
        w={['85%', '85%', '100%', '90vw', '70%']}
        h={['80vh', '200vh', '80vh']}
      >
        <Typography
          as="p"
          // fontSize={['2xl', '4xl', null, '5xl', '4xl']}
          size="5xl"
          color="gray.900"
          lineHeight="92%"
          letterSpacing="-2.2%"
        >
          Zapisz się na
        </Typography>
        <Logo color="black" w="60%" />

        <Flex direction="column" w={['100%', '100%', '62%']}>
          <Typography
            as="p"
            // fontSize={['md', 'lg', 'xl', '2xl', 'xl']}
            size="xl"
            lineHeight="116%"
            textAlign="center"
          >
            Podczas CodersCamp będzie Ci potrzebne konto na portalu GitHub - najpopularniejszym spośród narzędzi
            umożliwiających udostępnianie kodu innym oraz współpracę przy projektach programistycznych.
          </Typography>

          <Typography
            as="p"
            // fontSize={['md', 'lg', 'xl', '2xl', 'xl']}
            size="xl"
            lineHeight="116%"
            textAlign="center"
            mt="3rem"
          >
            Jeśli nie posiadasz konta na tej platformie{' '}
            <Typography
              as="a"
              // fontSize={['md', 'lg', 'xl', '2xl', 'xl']}
              size="xl"
              href="https://github.com/signup"
            >
              kliknij ten link
            </Typography>
            , aby je założyć. Następnie wróć tutaj i kliknij przycisk poniżej.
          </Typography>
        </Flex>

        <Button
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
          icon={<SolidGitHubIcon />}
          size="lg"
          colorScheme="github"
          borderRadius="6px"
          p="1.25rem"
          aria-label="GitHub login Button"
        >
          Zapisz mnie na CodersCamp używając konta GitHub
        </Button>
      </Flex>
    </Flex>
  );
};
