import { PropsWithChildren } from 'react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';

import { Link, LinkProps } from '@coderscamp/ui/components/Link';

export interface InternalLinkProps extends PropsWithChildren<NextLinkProps & Omit<LinkProps, 'as'>> {
  withUnderline?: boolean;
}

export const InternalLink = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  withUnderline = true,
  ...chakraProps
}: InternalLinkProps) => {
  const underlineProps = withUnderline ? { textDecoration: 'underline', textUnderlineOffset: '2px' } : {};

  return (
    <NextLink passHref href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch}>
      <Link color="blue.700" {...chakraProps} {...underlineProps}>
        {children}
      </Link>
    </NextLink>
  );
};
