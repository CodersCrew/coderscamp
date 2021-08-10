import React, { ReactElement } from 'react';

import { Link } from '@coderscamp/ui/components/Link';
import { HStack } from '@coderscamp/ui/components/Stack';

interface ContactLinkProps {
  children: string;
  href: string;
  icon: ReactElement;
}

export const ContactLink = ({ children, href, icon }: ContactLinkProps) => {
  return (
    <HStack spacing="8px" align="center">
      {React.cloneElement(icon, { width: '24px', height: '24px' })}
      <Link href={href} textDecoration="underline" color="gray.700" size="lg" target="_blank">
        {children}
      </Link>
    </HStack>
  );
};
