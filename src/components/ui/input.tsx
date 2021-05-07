// packages
import cn from "classnames";
// types
import { ComponentProps, forwardRef } from "react";

export interface InputProps extends ComponentProps<"input"> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = "text", className, disabled, ...rest } = props;

  const rootClass = cn(
    "block focus:ring-0 w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
    {
      "focus:border-red-400 bg-gray-100 text-gray-600 cursor-not-allowed select-none": disabled,
      "focus:border-black-normal": !disabled,
    },
    className
  );

  return <input type={type} ref={ref} className={rootClass} disabled={disabled} {...rest} />;
});

export default Input;
