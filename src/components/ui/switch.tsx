// packages
import cn from "classnames";
import { Switch as TSwitch } from "@headlessui/react";
// types
import type { Dispatch, SetStateAction } from "react";

enum Scheme {
  blue,
  green,
  yellow,
  purple,
  red,
}

export interface SwitchProps {
  label: string;
  isChecked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  srOnly?: boolean;
  colorScheme?: keyof typeof Scheme;
  className?: string;
  disabled?: boolean;
}

export default function Switch({
  label,
  isChecked,
  setChecked,
  srOnly = false,
  colorScheme = "red",
  className,
  disabled = false,
  ...rest
}: SwitchProps) {
  const rootClass = cn(
    "relative inline-flex items-center shadow-inner h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-normal",
    {
      "bg-blue-600": isChecked && colorScheme === "blue" && !disabled,
      "bg-green-600": isChecked && colorScheme === "green" && !disabled,
      "bg-yellow-600": isChecked && colorScheme === "yellow" && !disabled,
      "bg-purple-600": isChecked && colorScheme === "purple" && !disabled,
      "bg-secondary": isChecked && colorScheme === "red" && !disabled,
      "bg-gray-200 hover:bg-gray-300": !isChecked && !disabled,
      "bg-gray-300 cursor-not-allowed": disabled,
    },
    className
  );
  const motionClass = cn(
    "inline-block w-4 h-4 transform bg-white-normal shadow-md rounded-full transition-transform",
    {
      "translate-x-6": isChecked,
      "translate-x-1": !isChecked,
    }
  );

  return (
    <TSwitch.Group>
      <div className="flex items-center">
        <TSwitch
          checked={isChecked}
          onChange={setChecked}
          className={rootClass}
          disabled={disabled}
          {...rest}
        >
          {srOnly && <span className="sr-only">{label}</span>}
          <span className={motionClass} />
        </TSwitch>
        {!srOnly && <TSwitch.Label className="ml-2 font-semibold">{label}</TSwitch.Label>}
      </div>
    </TSwitch.Group>
  );
}
