import React from 'react';
import { SiGithub } from 'react-icons/si';
import { Flex, Text, Link, Button, Image} from '@chakra-ui/react';

function SignUpPageForCandidates() {
  return (
    <Flex direction="column" align="center" h="90vh" mt="5rem">
      <Flex direction="column" align="center" justify="space-evenly" w={['70%', '100%']} h="60%">
        <Text fontSize={{ sm: '14px', md: '40px', lg: '4xl' }} color="gray.900" lineHeight="92%" letterSpacing="-2.2%">
          Zapisz się na
        </Text>

        <Image src="../../assets/CodersCampLogo/CodersCampLogo.png" alt="Logo CodersCamp" />

        <Flex direction="column" width="62%">
          <Text fontSize="xl" lineHeight="116%" textAlign="center">
            Podczas CodersCamp będzie Ci potrzebne konto na portalu GitHub - najpopularniejszym spośród narzędzi
            umożliwiających udostępnianie kodu innym oraz współpracę przy projektach programistycznych.
          </Text>

          <Text fontSize='xl' lineHeight="116%" textAlign="center" mt="3rem">
            Jeśli nie posiadasz konta na tej platformie{' '}
            <Link href="https://github.com/signup" color="orange.400" isExternal textDecoration="underline">
              kliknij ten link
            </Link>
            , aby je założyć. Następnie wróć tutaj i kliknij przycisk poniżej.
          </Text>
        </Flex>

        <Button colorScheme="GitHub" leftIcon={<SiGithub />} borderRadius="6px" p="1.25rem">
          Zapisz mnie na CodersCamp używając konta GitHub
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignUpPageForCandidates;
