import { Link, LinkProps } from '@coderscamp/ui/components/Link';

interface ExternalLinkProps extends LinkProps {
  withUnderline?: boolean;
}

export const externalLinkBaseProps = { target: '_blank', rel: 'noreferrer noopener' };

export const ExternalLink = ({ children, withUnderline = true, ...chakraProps }: ExternalLinkProps) => {
  const underlineProps = withUnderline ? { textDecoration: 'underline', textUnderlineOffset: '2px' } : {};

  return (
    <Link color="blue.700" {...externalLinkBaseProps} {...chakraProps} {...underlineProps}>
      {children}
    </Link>
  );
};
