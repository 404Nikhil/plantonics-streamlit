import { forwardRef } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { DistributiveOmit } from '@mui/types';

interface NextLinkComposedProps
  extends DistributiveOmit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>,
    DistributiveOmit<NextLinkProps, 'href' | 'as' | 'onClick' | 'onMouseEnter'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
  onClick?: NextLinkProps['onClick'];
}

export const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(props, ref) {
  const { to, linkAs, href, replace, scroll, passHref, shallow, prefetch, locale, ...other } = props;

  return (
    <NextLink href={to} prefetch={prefetch} as={linkAs} replace={replace} scroll={scroll} shallow={shallow} passHref={passHref} locale={locale}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
  noLinkStyle?: boolean;
  ariaLabel?: string;
} & DistributiveOmit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  DistributiveOmit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const BaseLink = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href = '#',
    noLinkStyle,
    role, // Link don't have roles.
    ariaLabel,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href!.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <a className={className} href={href as string} ref={ref as any} rel={'noopener noreferrer'} aria-label={ariaLabel} {...other} />;
    }

    return <MuiLink className={className} href={href as string} ref={ref} rel={'noopener noreferrer'} aria-label={ariaLabel} {...other} />;
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref as any} to={href!} aria-label={ariaLabel} {...other} />;
  }

  return <MuiLink component={NextLinkComposed} linkAs={linkAs} className={className} ref={ref} to={href!} aria-label={ariaLabel} {...other} />;
});

export default BaseLink;
