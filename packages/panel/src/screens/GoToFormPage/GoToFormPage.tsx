import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Typography } from '@coderscamp/ui/components/Typography';

type GoToFormPageProps = { formExpirationDate?: string };

export const GoToFormPage: React.FC<GoToFormPageProps> = ({ formExpirationDate = '21.10.2021' }) => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" bg="#E5E5E5">
      <Flex
        direction="column"
        align="center"
        justify="space-evenly"
        w={['100vw', null, null, '90vw', '51vw']}
        h={['100vh', null, null, '60vh']}
        p="32px 24px"
        textAlign="center"
        borderRadius="8px"
        bg="#fff"
        boxShadow="base"
      >
        <Typography as="h1" size="2xl">
          Właśnie założyłeś konto na platformie kursu CodersCamp 🎉
        </Typography>
        <Typography as="p" size="md">
          Zanim uzyskasz pełen dostęp do platformy chcielibyśmy trochę lepiej Cię poznać. Poniżej znajdziesz 3-etapowy
          formularz, którego wypełnienie powinno zająć Ci od 15 do 30 minut.
        </Typography>
        <Typography as="p" size="md">
          Jeśli obecnie nie masz tyle czasu nie przejmuj się. Możesz zapisać sobie adres URL tej strony i wrócić na nią
          później. Pamiętaj jednak, aby wysłać formularz nie później niż {formExpirationDate}
        </Typography>
        <Button colorScheme="brand" p="8px 16px">
          Przejdź do formularza
        </Button>
      </Flex>
    </Flex>
  );
};
