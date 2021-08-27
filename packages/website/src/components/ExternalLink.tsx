import { Link, LinkProps } from '@coderscamp/ui/components/Link';

export const ExternalLink = ({ children, ...chakraProps }: LinkProps) => {
  return (
    <Link {...chakraProps} textDecoration="underline" textUnderlineOffset="2px">
      {children}
    </Link>
  );
};
