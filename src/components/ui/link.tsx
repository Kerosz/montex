// packages
import NextLink from "next/link";
// types
import type { LinkProps as NextLinkProps } from "next/link";
import type { FC, AnchorHTMLAttributes } from "react";

interface LinkProps extends NextLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  external?: boolean;
  fixPosition?: boolean;
}

const Link: FC<LinkProps> = ({
  href,
  replace,
  children,
  external = false,
  fixPosition = false,
  ...rest
}) => {
  if (external) {
    return (
      <a
        className={`${fixPosition ? "flex" : "inline"}`}
        href={href as string}
        rel="noopener noreferrer"
        target="_blank"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} replace={replace}>
      <a className={`${fixPosition ? "flex" : "inline"}`} {...rest}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
