import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';

import { useUserActions } from '@/modules/user';

export const Dashboard = () => {
  const authActions = useUserActions();

  const handleClick = () => {
    authActions.logout();
  };

  return (
    <Center width="100vw" height="100vh">
      <Button color="brand" size="lg" onClick={handleClick}>
        Wyloguj się
      </Button>
    </Center>
  );
};
