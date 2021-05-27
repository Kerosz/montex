// packages
import cn from "classnames";
// types
import type { ComponentProps, ReactNode } from "react";

enum Scheme {
  green,
  red,
  yellow,
  purple,
  blue,
  gray,
}

enum Size {
  normal,
  medium,
  large,
}

export interface BadgeProps extends ComponentProps<"span"> {
  label?: string | number;
  colorScheme?: keyof typeof Scheme;
  size?: keyof typeof Size;
  children?: ReactNode;
  uppercase?: boolean;
}

export default function Badge({
  label,
  colorScheme = "green",
  size = "normal",
  className,
  children,
  uppercase,
  ...rest
}: BadgeProps): JSX.Element {
  const rootClass = cn(
    "px-2 py-0.5 inline-flex font-semibold rounded-xl border cursor-default",
    {
      "bg-green-100 text-green-800 border-green-300": colorScheme === "green",
      "bg-yellow-100 text-yellow-800 border-green-300": colorScheme === "yellow",
      "bg-red-100 text-red-800 border-green-300": colorScheme === "red",
      "bg-blue-100 text-blue-800 border-green-300": colorScheme === "blue",
      "bg-purple-100 text-purple-800 border-purple-300": colorScheme === "purple",
      "bg-gray-100 text-gray-800 border-gray-300": colorScheme === "gray",
    },
    {
      "text-xs": size === "normal",
      "text-base": size === "medium",
      "text-lg": size === "large",
    },
    { uppercase: uppercase },
    className
  );

  return (
    <span className={rootClass} {...rest}>
      {label || children}
    </span>
  );
}
