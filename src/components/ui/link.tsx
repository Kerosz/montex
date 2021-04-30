// packages
import NextLink from "next/link";
import cn from "classnames";
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
  className,
  external = false,
  fixPosition = false,
  ...rest
}) => {
  const rootClass = cn(
    {
      flex: fixPosition,
      inline: !fixPosition,
    },
    className
  );

  if (external) {
    return (
      <a
        className={rootClass}
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
      <a className={rootClass} {...rest}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
