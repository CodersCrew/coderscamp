import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { Button } from '../Button';
import { Typography } from '../Typography';

type MaterialsCardStatus = 'idle' | 'loading' | 'generated';

export interface MaterialsCardProps extends BoxProps {
  status: MaterialsCardStatus;
}

type MaterialsCardOptions = Record<MaterialsCardStatus, { statusText: string; buttonText: string }>;

const MaterialsCardText: MaterialsCardOptions = {
  idle: {
    statusText: 'Kliknij przycisk poniżej, aby wygenerować swoja unikalną listę z materiałami.',
    buttonText: 'Wygeneruj listę',
  },
  loading: {
    statusText: 'Trwa generowanie materiałów...',
    buttonText: 'Generowanie listy...',
  },
  generated: {
    statusText: 'Twoja lista materiałów znajduje się na platformie Process.st',
    buttonText: 'Przejdź do listy materiałów',
  },
};

export const MaterialsCard = ({ status, ...props }: MaterialsCardProps) => {
  return (
    <Box w="100%" boxShadow="base" borderRadius="8px" padding="24px" {...props}>
      <Typography as="p" fontWeight="800" size="xl" lineHeight="xl" letterSpacing="xl">
        Materiały
      </Typography>
      <Box paddingTop="24px">
        <Typography lineHeight="md" letterSpacing="md">
          {MaterialsCardText[status].statusText}
        </Typography>
        {status === 'loading' && (
          <Typography lineHeight="md" letterSpacing="md">
            Może to zająć do kilku minut.
          </Typography>
        )}
      </Box>
      <Box paddingTop="24px">
        <Button color="brand" disabled={status === 'loading'} display="block">
          {MaterialsCardText[status].buttonText}
        </Button>
      </Box>
    </Box>
  );
};
