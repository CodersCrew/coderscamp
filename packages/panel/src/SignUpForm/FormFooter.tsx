import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';

interface Props {
  children?: any;
}

export const FormFooter: React.FC<Props> = ({ children }) => {
  return (
    <Box bgColor="gray.700" width="100%" height="80px" padding="16px 24px">
      {children}
    </Box>
  );
};
