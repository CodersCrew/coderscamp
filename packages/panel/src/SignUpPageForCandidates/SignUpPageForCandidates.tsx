import React from 'react';
import { SiGithub } from 'react-icons/si';
import { useBreakpointValue } from '@chakra-ui/react';
import { Flex, Text, Link, Button, Image } from '@chakra-ui/react';

//TODO: Change Button to Button component from ui package
//TODO: Change Image to Logo Component from ui package
//TODO: An icon package is currently installed, when it's not needed, remove it

const SignUpPageForCandidates = () => {
  const buttonSize = useBreakpointValue(['sm', 'xl']);

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
        <Text fontSize={['2xl', '4xl', null, '5xl', '4xl']} color="gray.900" lineHeight="92%" letterSpacing="-2.2%">
          Zapisz się na
        </Text>

        <Image src="../../assets/CodersCampLogo/CodersCampLogo.png" alt="Logo CodersCamp" />

        <Flex direction="column" w={['100%', '100%', '62%']}>
          <Text fontSize={['md', 'lg', 'xl', '2xl', 'xl']} lineHeight="116%" textAlign="center">
            Podczas CodersCamp będzie Ci potrzebne konto na portalu GitHub - najpopularniejszym spośród narzędzi
            umożliwiających udostępnianie kodu innym oraz współpracę przy projektach programistycznych.
          </Text>

          <Text fontSize={['md', 'lg', 'xl', '2xl', 'xl']} lineHeight="116%" textAlign="center" mt="3rem">
            Jeśli nie posiadasz konta na tej platformie{' '}
            <Link href="https://github.com/signup" color="orange.400" isExternal textDecoration="underline">
              kliknij ten link
            </Link>
            , aby je założyć. Następnie wróć tutaj i kliknij przycisk poniżej.
          </Text>
        </Flex>

        <Button
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
          size={buttonSize}
          colorScheme="GitHub"
          leftIcon={<SiGithub />}
          borderRadius="6px"
          p="1.25rem"
        >
          Zapisz mnie na CodersCamp używając konta GitHub
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignUpPageForCandidates;
