// packages
import { forwardRef } from "react";
import cn from "classnames";
// types
import type { FC, ComponentType, HTMLAttributes } from "react";
import type { Component } from "@/types";

enum Variant {
  primary,
  secondary,
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: Component;
  component?: Component;
  reset?: boolean;
  maxW?: string;
}

const Button: FC<ContainerProps> = (props) => {
  const { as, component = "div", className, children, reset, maxW = "", ...rest } = props;

  const Element = (as || component) as ComponentType<HTMLAttributes<HTMLDivElement>>;

  const rootClass = cn(
    maxW,
    {
      "lg:px-16 md:px-12 px-3 mx-auto w-full": !reset,
      "max-w-screen-xl": !maxW,
    },
    className
  );

  return (
    <Element className={rootClass} {...rest}>
      {children}
    </Element>
  );
};

export default Button;
