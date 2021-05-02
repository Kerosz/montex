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

enum Type {
  submit,
  reset,
  button,
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: keyof typeof Type;
  label?: string;
  href?: string;
  as?: Component;
  component?: Component;
  variant?: keyof typeof Variant;
  disabled?: boolean;
  loading?: boolean;
  external?: boolean;
}

const Button: FC<ButtonProps> = forwardRef((props, ref) => {
  const {
    type = "button",
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
  const slimClass = "rounded-md";

  const rootClass = cn(
    {
      [primaryClass]: variant === "primary",
      [secondaryClass]: variant === "secondary",
      [slimClass]: variant === "slim",
      "opacity-25": disabled,
    },
    className
  );

  return (
    <Element type={type} ref={ref} className={rootClass} disabled={disabled} {...rest}>
      {loading ? "Loading..." : label || children}
    </Element>
  );
});

export default Button;
