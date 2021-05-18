// packages
import { forwardRef } from "react";
import cn from "classnames";
// types
import type { ComponentProps } from "react";
import type { Component } from "@/types";

enum Variant {
  primary,
  secondary,
  slim,
  twitter,
  outlined,
  modern,
}

enum Size {
  small,
  normal,
  medium,
  large,
  full,
}

export interface ButtonProps extends ComponentProps<"button"> {
  label?: string;
  href?: string;
  as?: Component;
  component?: Component;
  variant?: keyof typeof Variant;
  size?: keyof typeof Size;
  disabled?: boolean;
  loading?: boolean;
  external?: boolean;
  reset?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = "button",
    label,
    as,
    component = "button",
    className,
    variant = "slim",
    size,
    disabled,
    children,
    loading,
    reset = false,
    ...rest
  } = props;

  const primaryClass =
    "bg-black-normal text-white-normal hover:bg-black-light border border-black-normal hover:border-black-light";
  const twitterClass = "bg-blue-500 border border-gray-200 text-white-normal hover:text-gray-200";
  const secondaryClass =
    "bg-white-normal text-gray-500 border border-gray-200 hover:text-black-light";
  const outlinedClass =
    "bg-transparent text-gray-800 border border-gray-800 hover:text-secondary hover:border-secondary";
  const modernClass =
    "bg-gray-50 text-gray-800 uppercase hover:border-gray-300 hover:shadow hover:bg-gray-100 hover:text-gray-700 border border-gray-200";
  const slimClass = "";

  const rootClass = cn(
    { "rounded-md font-semibold": !reset },
    {
      [primaryClass]: variant === "primary",
      [twitterClass]: variant === "twitter",
      [secondaryClass]: variant === "secondary",
      [outlinedClass]: variant === "outlined",
      [modernClass]: variant === "modern",
      [slimClass]: variant === "slim",
      "px-4 py-1 text-sm": size === "small",
      "py-1.5 px-4 text-base": size === "normal",
      "py-1.5 px-8 text-base": size === "medium",
      "py-2.5 px-9 text-lg": size === "large",
      "w-full py-2.5 flex justify-center items-center": size === "full",
      "opacity-25": disabled,
    },
    className
  );

  const Element = as || component;

  return (
    <Element type={type} ref={ref} className={rootClass} disabled={disabled} {...rest}>
      {loading ? "Loading..." : label || children}
    </Element>
  );
});

export default Button;
