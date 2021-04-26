// packages
import { forwardRef } from "react";
import cn from "classnames";
// types
import type { FC, ButtonHTMLAttributes } from "react";
import type { Component } from "@/types";

enum Variant {
  primary,
  secondary,
  slim,
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  href?: string;
  as?: Component;
  component?: Component;
  variant?: keyof typeof Variant;
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = forwardRef((props, ref) => {
  const {
    label,
    as,
    component = "button",
    className,
    variant = "primary",
    disabled,
    children,
    loading,
    ...rest
  } = props;

  const Element = as || component;

  const primaryClass =
    "bg-black-normal font-semibold rounded-md text-white-normal hover:bg-black-light";
  const secondaryClass =
    "rounded-md text-gray-500 font-semibold border border-gray-200 hover:text-black-light";
  const slimClass = "text-gray-600 font-medium hover:text-black-normal";

  const rootClass = cn(
    {
      [primaryClass]: variant === "primary",
      [secondaryClass]: variant === "secondary",
      [slimClass]: variant === "slim",
    },
    className
  );

  return (
    <Element ref={ref} className={rootClass} disabled={disabled} {...rest}>
      {loading ? "Loading..." : label || children}
    </Element>
  );
});

export default Button;
