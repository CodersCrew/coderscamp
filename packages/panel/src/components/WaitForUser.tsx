import React, { ReactNode } from 'react';

import { Center } from '@coderscamp/ui/components/Center';

import { useUserStatus } from '@/modules/user/userHooks';

const centerProps = { width: '100vw', height: '100vh' };

export const WaitForUser = ({ children }: { children: ReactNode }) => {
  const userStatus = useUserStatus();

  if (userStatus === 'idle' || userStatus === 'loading') {
    return <Center {...centerProps}>Wczytywanie strony...</Center>;
  }

  if (userStatus === 'failure') {
    return <Center {...centerProps}>Błąd podczas wczytywania strony</Center>;
  }

  return <>{children}</>;
};
