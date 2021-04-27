// packages
import NextLink from "next/link";
// types
import type { LinkProps as NextLinkProps } from "next/link";
import type { FC, AnchorHTMLAttributes } from "react";

interface LinkProps
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {}

const Link: FC<LinkProps> = ({ href, replace, children, ...rest }) => {
  return (
    <NextLink href={href} replace={replace}>
      <a className="flex" {...rest}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
