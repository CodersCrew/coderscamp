import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';

export const Dashboard = () => {
  return (
    <Center width="100vw" height="100vh">
      <Button color="brand" size="lg">
        Wyloguj się
      </Button>
    </Center>
  );
};
