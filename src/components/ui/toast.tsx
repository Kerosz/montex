//packages
import cn from "classnames";
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
//store
import { useToastStore } from "@store/useToastStore";
//types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

enum Status {
  info,
  warning,
  success,
  error,
}

type ConfigProps = {
  duration?: number;
  status: keyof typeof Status;
  title: string;
  description: string;
};

export interface ToastProps extends Omit<ComponentPropsWithoutRef<"div">, "id"> {
  id: string | number;
  config: ConfigProps;
  children?: ReactNode;
}

export function Toast({ id, className, config, ...rest }: ToastProps): JSX.Element {
  const { duration = 4500, status = "info", title, description } = config;

  const { toastListState, close } = useToastStore.getState();

  const isOpen = toastListState.has(id);

  console.log("toast triggered");
  console.log(isOpen);

  const rootClass = cn(
    "px-8 py-3 bg-gray-50 border border-gray-200 z-40",
    {
      "bg-red-400": status === "error",
      "bg-yellow-400": status === "warning",
      "bg-blue-400": status === "info",
      "bg-green-400": status === "success",
    },
    className
  );

  useEffect(() => {
    if (!duration || !isOpen) return;

    const timeoutID = setTimeout(() => {
      close(id);
    }, duration);

    return () => clearTimeout(timeoutID);
  }, [duration, isOpen, id, close]);

  return createPortal(
    <>
      {isOpen && (
        <div className={rootClass} {...rest} role="alert">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      )}
    </>,
    document.getElementById("__portals") as Element
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useToast() {
  const { show } = useToastStore.getState();

  const toast: (args: ToastProps) => JSX.Element = useCallback(
    (args) => {
      show(args.id);

      return <Toast {...args} />;
    },
    [show]
  );

  return toast;
}
