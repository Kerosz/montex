// packages
import cn from "classnames";
import { forwardRef } from "react";
// types
import type { ComponentPropsWithRef } from "react";

enum Variant {
  normal,
  full,
}

export interface InputProps extends ComponentPropsWithRef<"input"> {
  variant?: keyof typeof Variant;
  isError?: boolean;
  error?: string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    className,
    disabled,
    readOnly,
    isError,
    error,
    hidden,
    variant,
    ...rest
  } = props;

  const rootClass = cn(
    "block focus:ring-0 shadow-sm sm:text-sm border-gray-300 rounded-md",
    {
      "focus:border-red-300 bg-gray-100 text-gray-500 cursor-not-allowed select-none":
        disabled || readOnly,
      "focus:border-black-normal": !disabled || !readOnly,
      "w-full": variant === "full",
    },
    className
  );

  return (
    <>
      <input
        type={type}
        ref={ref}
        className={hidden ? "" : rootClass}
        disabled={disabled}
        readOnly={readOnly}
        hidden={hidden}
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
