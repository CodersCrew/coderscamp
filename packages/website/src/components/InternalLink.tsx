import { PropsWithChildren } from 'react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';

import { Link, LinkProps } from '@coderscamp/ui/components/Link';

export type InternalLinkProps = PropsWithChildren<NextLinkProps & Omit<LinkProps, 'as'>>;

export const InternalLink = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}: InternalLinkProps) => {
  return (
    <NextLink passHref href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch}>
      <Link {...chakraProps} textDecoration="underline" textUnderlineOffset="2px">
        {children}
      </Link>
    </NextLink>
  );
};
