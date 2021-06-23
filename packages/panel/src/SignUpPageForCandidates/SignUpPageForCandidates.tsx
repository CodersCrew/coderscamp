import React from 'react';
import { Flex, Spacer, Text, Link, Button, Image, Box } from '@chakra-ui/react';

function SignUpPageForCandidates() {
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Flex direction="column" align="center" w="70%">
        <Text fontSize="4xl" color="gray.900" lineHeight="92%" letterSpacing="-2.2%">
          Zapisz się na
        </Text>
        <Image src="../assets/CodersCampLogo/CodersCampLogo.png" alt="CodersCamp logo" />
        <Flex mt="3rem" direction="column" width="62%">
          <Text fontFamily="Inter" fontSize="xl" lineHeight="116%" textAlign="center">
            Podczas CodersCamp będzie Ci potrzebne konto na portalu GitHub - najpopularniejszym spośród narzędzi
            umożliwiających udostępnianie kodu innym oraz współpracę przy projektach programistycznych.
          </Text>
          <Text fontSize="xl" lineHeight="116%" textAlign="center" mt="3rem">
            Jeśli nie posiadasz konta na tej platformie{' '}
            <Link href="https://github.com/signup" color="orange.400" isExternal textDecoration="underline">
              kliknij ten link
            </Link>
            , aby je założyć. Następnie wróć tutaj i kliknij przycisk poniżej.
          </Text>
        </Flex>

        <Button mt="3rem" variant="solid" backgroundColor="GitHub.500" color="white">
          Zapisz mnie na CodersCamp używając konta GitHub
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignUpPageForCandidates;
