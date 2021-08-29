import { Link, LinkProps } from '@coderscamp/ui/components/Link';

interface ExternalLinkProps extends LinkProps {
  withUnderline?: boolean;
}

export const ExternalLink = ({ children, withUnderline = true, ...chakraProps }: ExternalLinkProps) => {
  const underlineProps = withUnderline ? { textDecoration: 'underline', textUnderlineOffset: '2px' } : {};

  return (
    <Link target="_blank" rel="noreferrer" {...chakraProps} {...underlineProps}>
      {children}
    </Link>
  );
};
