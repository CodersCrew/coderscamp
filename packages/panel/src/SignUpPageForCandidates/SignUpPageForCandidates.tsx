import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Logo } from '@coderscamp/ui/components/Logo';
import { Typography } from '@coderscamp/ui/components/Typography';

import { SolidGitHubIcon } from '../../../ui/src/icons/SolidGitHub';

export const SignUpPageForCandidates = () => {
  return (
    <Flex direction="column" align="center" mt={[null, '2rem', '1rem', '3rem']}>
      <Flex
        direction="column"
        align="center"
        justify="space-evenly"
        w={['90%', '85%', '90%', '90%', '70%']}
        h={['130vh', '150vh', '100vh', '80vh']}
      >
        <Typography as="p" size="5xl" color="gray.900" lineHeight="5xl" textAlign="center">
          Zapisz się na
        </Typography>
        <Logo color="black" w={[null, '85%', '100%', '90%', '60%']} />

        <Flex direction="column" w={['100%', '100%', '62%']}>
          <Typography as="p" size="xl" lineHeight="md" letterSpacing="sm" textAlign="center">
            Podczas CodersCamp będzie Ci potrzebne konto na portalu GitHub - najpopularniejszym spośród narzędzi
            umożliwiających udostępnianie kodu innym oraz współpracę przy projektach programistycznych.
          </Typography>

          <Typography as="p" size="xl" lineHeight="md" letterSpacing="sm" textAlign="center" mt="2rem">
            Jeśli nie posiadasz konta na tej platformie{' '}
            <Typography as="a" size="xl" href="https://github.com/signup">
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
          h={['9%', 'auto']}
          colorScheme="github"
          borderRadius="6px"
          p="10px 24px"
          aria-label="GitHub login Button"
        >
          Zapisz mnie na CodersCamp używając konta GitHub
        </Button>
      </Flex>
    </Flex>
  );
};
