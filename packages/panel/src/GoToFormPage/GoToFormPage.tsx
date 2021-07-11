import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Typography } from '@coderscamp/ui/components/Typography';

// TODO: formExpirationDate propably will be not string type, need to change

type GoToFormPageProps = { formExpirationDate: string };

export const GoToFormPage: React.FC<GoToFormPageProps> = ({ formExpirationDate = 'FORMAT DATY' }) => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" bg="#E5E5E5">
      <Flex
        direction="column"
        align="center"
        justify="space-evenly"
        w={['90vw', '95vw', null, '90vw', '40%']}
        h={['90vh', '40vw', null, '40%']}
        p="32px 24px"
        textAlign="center"
        borderRadius="8px"
        bg="#fff"
        boxShadow="0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"
      >
        <Typography as="h1" size="2xl" fontWeight="500" lineHeight="116%" letterSpacing="-1.7%">
          Właśnie założyłeś konto na platformie kursu CodersCamp 🎉
        </Typography>
        <Typography as="p" size="md" lineHeight="124%" letterSpacing="-1.1%">
          Zanim uzyskasz pełen dostęp do platrofmy chcielibyśmy trochę lepiej Cię poznać. Poniżej znajdziesz 3-etapowy
          formularz, którego wypełnienie powinno zająć Ci od 15 do 30 minut.
        </Typography>
        <Typography lineHeight="124%" letterSpacing="-1.1%">
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
