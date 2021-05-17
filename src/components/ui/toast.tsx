//packages
import cn from "classnames";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
//types
import type { ReactNode } from "react";

enum Status {
  info,
  warning,
  success,
  error,
}

type ConfigProps = {
  withIcon?: boolean;
  position?: `${"top" | "bottom"}-${"left" | "right"}`;
};

interface ToastHookReturn {
  config: ToastProps;
  toast: (args: Omit<ToastProps, "isOpen" | "onClose">) => void;
}

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  status: keyof typeof Status;
  title: string;
  description: string;
  duration: number;
  config?: ConfigProps;
  children?: ReactNode;
}

export default function Toast({
  isOpen,
  onClose,
  title,
  description,
  status,
  config = {},
}: ToastProps): JSX.Element {
  const { withIcon = false, position = "top-left" } = config;

  const overlayClass = cn("fixed px-4 py-6 z-50", {
    "left-0 top-0": position === "top-left",
    "right-0 top-0": position === "top-right",
    "left-0 bottom-0": position === "bottom-left",
    "right-0 bottom-0": position === "bottom-right",
  });

  const rootClass = cn("w-[400px] px-3 py-4 shadow-lg rounded-md", {
    "border border-blue-500 bg-blue-400": status === "info",
    "border border-red-500 bg-red-400": status === "error",
    "border border-yellow-500 bg-yellow-400": status === "warning",
    "border border-green-500 bg-green-400": status === "success",
  });

  return (
    <div className={overlayClass}>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className={rootClass}>
          <div className="flex items-start">
            {withIcon && (
              <div className="flex-shrink-0 mr-4 place-self-center text-white-normal">
                {status === "success" && <CheckCircleIcon className="w-9" />}
                {status === "info" && <InformationCircleIcon className="w-9" />}
                {status === "warning" && <ExclamationIcon className="w-9" />}
                {status === "error" && <XCircleIcon className="w-9" />}
              </div>
            )}
            <div className="flex-grow">
              <p className="text-base font-semibold text-white-normal text-left">{title}</p>
              <p className="mt-1.5 text-sm text-white-normal text-left">{description}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="text-white-normal border border-gray-50 px-2 rounded-md focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white-normal"
              >
                <span className="sr-only">Close</span>x
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

const DEFAULT_TOAST_CONFIG = {
  isOpen: false,
  onClose: null as unknown as () => void,
  title: "Action completed.",
  description: "We've completed the action for you.",
  status: "success",
  duration: 4500,
} as ToastProps;

export function useToast(): ToastHookReturn {
  const [toastState, setToast] = useState<ToastProps>(DEFAULT_TOAST_CONFIG);
  const { isOpen, duration } = toastState;

  const toastConfig = useMemo(() => toastState, [toastState]);
  const onClose = useCallback(() => setToast((prevState) => ({ ...prevState, isOpen: false })), []);

  const handleToast = (args: Omit<ToastProps, "isOpen" | "onClose">) => {
    setToast({ ...args, isOpen: true, onClose });
  };

  useEffect(() => {
    if (!duration || !isOpen) return;

    const timeoutID = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timeoutID);
  }, [duration, isOpen]);

  return { config: toastConfig, toast: handleToast };
}
