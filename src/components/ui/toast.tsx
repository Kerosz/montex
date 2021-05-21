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
// components
import Button from "@components/ui/button";
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
  const { withIcon = true, position = "top-right" } = config;

  const overlayClass = cn("fixed px-4 py-6 z-50", {
    "left-0 top-0": position === "top-left",
    "right-0 top-0": position === "top-right",
    "left-0 bottom-0": position === "bottom-left",
    "right-0 bottom-0": position === "bottom-right",
  });

  const iconClass = cn("sm:mx-5 sm:my-0 my-2 place-self-center", {
    "text-blue-400": status === "info",
    "text-red-400": status === "error",
    "text-yellow-400": status === "warning",
    "text-green-400": status === "success",
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
        <div className="w-full bg-gray-50 border border-gray-100 shadow-md rounded-md" role="alert">
          <div className="flex sm:flex-row flex-col items-center">
            {withIcon && (
              <div className={iconClass}>
                {status === "success" && <CheckCircleIcon className="w-10" />}
                {status === "info" && <InformationCircleIcon className="w-10" />}
                {status === "warning" && <ExclamationIcon className="w-10" />}
                {status === "error" && <XCircleIcon className="w-10" />}
              </div>
            )}
            <div className="flex-grow sm:max-w-sm max-w-sm sm:border-l sm:border-r sm:border-t-0 sm:border-b-0 border-t border-b border-gray-300 sm:px-5 px-3 py-3">
              <p className="text-base font-semibold text-black-normal text-left">{title}</p>
              <p className="mt-1.5 text-sm text-black-normal text-left">{description}</p>
            </div>

            <Button
              variant="slim"
              onClick={onClose}
              className="sm:p-4 sm:max-w-max w-full p-2 text-sm"
              reset
            >
              Dismiss
            </Button>
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
