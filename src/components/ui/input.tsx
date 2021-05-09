// packages
import { forwardRef } from "react";
import cn from "classnames";
// types
import type { ComponentPropsWithRef } from "react";
import type { Component } from "@/types";

export interface InputProps extends ComponentPropsWithRef<"input"> {
  as?: Component;
  component?: Component;
  rows?: string | number;
  cols?: string | number;
  isError?: boolean;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    as,
    component = "input",
    className,
    disabled,
    readOnly,
    isError,
    error,
    ...rest
  } = props;

  const rootClass = cn(
    "block focus:ring-0 w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
    {
      "focus:border-red-300 bg-gray-100 text-gray-500 cursor-not-allowed select-none":
        disabled || readOnly,
      "focus:border-black-normal": !disabled || !readOnly,
    },
    className
  );

  const El = as || component;

  return (
    <>
      <El
        type={type}
        ref={ref}
        className={rootClass}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
      {isError && (
        <span role="alert" className="block text-sm text-secondary mt-1 pl-0.5">
          {error}
        </span>
      )}
    </>
  );
});

export default Input;
