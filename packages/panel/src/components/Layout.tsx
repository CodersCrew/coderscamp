import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Sidebar } from '@coderscamp/ui/components/Sidebar';
import { HStack } from '@coderscamp/ui/components/Stack';

import { useIsUserAuthorized } from '@/modules/user/userHooks';

export const Layout: React.FC = ({ children }) => {
  const isAuthorized = useIsUserAuthorized();

  return (
    <HStack>
      {isAuthorized && <Sidebar width="256px" />}
      <Box w="100%">{children}</Box>
    </HStack>
  );
};
